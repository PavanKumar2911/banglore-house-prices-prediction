from flask import Flask, request, jsonify, redirect, url_for
from . import util

# CRITICAL FIX: Load artifacts immediately when server.py is imported
# Gunicorn will execute this line before starting workers.
util.load_saved_artifacts()

# Cleaned up app initialization: using a single, comprehensive import line
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
    # 1. Try to get data from JSON body (common for modern AJAX)
    data = request.json
    # 2. If no JSON, try to get data from form body (common for jQuery $.post)
    if not data:
        data = request.form
    # 3. If no form data, try to get data from query arguments (GET request fallback)
    if not data:
        data = request.args
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    try:
        # Extract and convert data using the dynamically determined 'data' dictionary
        total_sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])
    except Exception as e:
        # Simple error handling if form data is missing or invalid
        return jsonify({'error': f'Invalid input data or missing fields: {e}'}), 400

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


# Client/Static Routes
@app.route('/')
def index():
    # Redirect the root URL (/) to the main HTML file via the static path (/client_static/app.html).
    return redirect(url_for('static', filename='app.html', _external=True, _scheme='https'))


# Local Run (The load call is redundant now but harmless for local testing)
if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run(debug=True, host='0.0.0.0', port=5000)
