from flask import Flask, request, jsonify, redirect, url_for, send_from_directory
from . import util
# import os

# Cleaned up app initialization: using a single, comprehensive import line
# The static_url_path needs to be correctly defined for url_for to work reliably
app = Flask(__name__, static_folder='../Client', static_url_path='/client_static')


# API Endpoints
@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    # Note: request.form is correct for jQuery's $.post data format
    try:
        total_sqft = float(request.form['total_sqft'])
        location = request.form['location']
        bhk = int(request.form['bhk'])
        bath = int(request.form['bath'])
    except Exception as e:
        # Simple error handling if form data is missing or invalid
        return jsonify({'error': f'Invalid input data: {e}'}), 400


    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# Client/Static Routes
@app.route('/')
def index():
    # Redirect the root URL (/) to the main HTML file via the static path (/client_static/app.html).
    # We explicitly define the static_url_path for maximum reliability.
    return redirect(url_for('static', filename='app.html', _external=True, _scheme='https'))


# Local Run (Not used by Render/Gunicorn)
if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    # Load the ML artifacts before starting the server
    util.load_saved_artifacts()
    # Ensure debug=True is off in production, but okay for local test
    app.run(debug=True, host='0.0.0.0', port=5000)
