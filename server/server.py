from flask import Flask, request, jsonify
from . import util
import os
from flask import send_from_directory
from flask import Flask, request, jsonify, render_template, redirect, url_for
app = Flask(__name__, static_folder='../Client', static_url_path='/client_static')

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def send_client_files(path):
#     # This function checks if a file exists in the Client folder (like app.css or app.js)
#     # If it doesn't find a specific file, it serves the main app.html file.
#     if path != "" and os.path.exists("Client/" + path):
#         return send_from_directory('Client', path)
#     else:
#         return send_from_directory('Client', 'app.html')

@app.route('/')
def index():
    # Redirect the root URL to the main HTML file via the static path
    return redirect(url_for('static', filename='app.html'))

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True, host='0.0.0.0', port=5000)