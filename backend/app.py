from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing for Flask

@app.route('/')
def home():
    return jsonify(message="Hello from Flask backend!")

if __name__ == "__main__":
    app.run(debug=True)
