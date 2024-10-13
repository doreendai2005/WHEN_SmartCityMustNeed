import os
from flask import Flask, jsonify, redirect, url_for, session, request
from flask_session import Session
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import google.auth.transport.requests
from flask_cors import CORS
from google.auth.transport.requests import Request
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

# Configure server-side session storage using filesystem
app.config['SESSION_TYPE'] = 'filesystem'  # You can change this to another type if needed
Session(app)  # Initialize session management

# Enable CORS and allow requests from React app
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load client ID JSON file from Google Cloud
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Only for local development
CLIENT_SECRETS_FILE = "/Users/daiyunhan/Desktop/when2meet-suck/backend/client_secret_.json"  # Path to your OAuth client JSON file

# The OAuth 2.0 flow
flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=['https://www.googleapis.com/auth/calendar.readonly'],  # Read-only access to calendar
    redirect_uri='http://127.0.0.1:5000/callback'  # Redirect URL for OAuth
)

# Route for Google OAuth login
@app.route('/login')
def login():
    authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    session['state'] = state  # Save the state for verification later
    return redirect(authorization_url)
    
def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
# OAuth callback route
@app.route('/callback')
def callback():
     # Fetch the OAuth token using the authorization response (the URL that includes the authorization code)
    flow.fetch_token(authorization_response=request.url)

    # Check if the state matches
    if not session['state'] == request.args['state']:
        return "Error: Invalid state", 403

    # Save credentials in the session
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)  # Store the credentials in session
    print("Credentials saved in session:", session['credentials'])

    # Redirect back to the React app
    return redirect('http://localhost:3000')


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Route to access the user's Google Calendar
@app.route('/calendar')
def calendar():
    # Ensure credentials are available in the session
    if 'credentials' not in session:
        print("Missing credentials!")  # Log this for debugging
        return jsonify({"error": "Missing credentials"}), 401
    
    print("Session credentials:", session.get('credentials'))


    credentials = Credentials(**session['credentials'])

    # Refresh the token if expired
    if credentials.expired and credentials.refresh_token:
        try:
            credentials.refresh(Request())  # Refresh credentials
            session['credentials'] = credentials_to_dict(credentials)  # Update session with refreshed credentials
        except Exception as e:
            print("Error refreshing credentials:", e)  # Log error
            return jsonify({"error": "Failed to refresh credentials"}), 500

    try:
        # Build the calendar API service
        service = build('calendar', 'v3', credentials=credentials)

        # Get the next 10 events on the user's calendar
        events_result = service.events().list(
            calendarId='primary', maxResults=10, singleEvents=True,
            orderBy='startTime').execute()
        events = events_result.get('items', [])
        return jsonify(events), 200
    except Exception as e:
        print("Error fetching events:", e)  # Log error
        return jsonify({"error": "Failed to fetch events"}), 500

def _build_cors_preflight_response():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

if __name__ == '__main__':
    app.run(debug=True)
