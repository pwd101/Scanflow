from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

REACT_APP_BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'dist'))

print("REACT_APP_BUILD_PATH:", REACT_APP_BUILD_PATH)

app = Flask(__name__, static_folder='client/dist')
CORS(app)  # Enable CORS for all routes

@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.get_json()
    print('Received data:', data)
    return jsonify({'message': 'Data received successfully!'}), 200


# Serve React App
@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    


if __name__ == '__main__':
    # This is only for local testing. Deployment to Cloud Functions uses the `main` function.
    app.run(debug=True, host='127.0.0.1', port=8080)

    """ Production """
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)


"""
gcloud functions deploy scanner --gen2 --runtime python312 --region=europe-west9 --trigger-http --allow-unauthenticated --source . --entry-point=main
"""