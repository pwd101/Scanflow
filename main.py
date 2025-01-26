from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pubsub import publish_message
from google.cloud import firestore

PROJECT_ID = "qr-code-decideomtour-scanflow" 
TOPIC_ID = "qr-code-scan"

# message_dict = {"name": "John Doe", "age": 30}
# publish_message(PROJECT_ID, TOPIC_ID, message_dict)

firestore_db = firestore.Client(project=PROJECT_ID)
docref = doc_ref = firestore_db.collection("test_coll").document("test_doc")
doc_ref_infos = doc_ref.get().to_dict()
print(doc_ref.get().to_dict())

# REACT_APP_BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'dist'))

# print("REACT_APP_BUILD_PATH:", REACT_APP_BUILD_PATH)

# app = Flask(__name__, static_folder='client/dist')
# CORS(app) 

# @app.route('/api/submit', methods=['POST'])
# def submit_data():
#     data = request.get_json()
#     print('Received data:', data)
#     return jsonify({'message': 'Data received successfully!'})


# # Serve React App
# @app.route('/', defaults={'path': ''}, methods=['GET'])
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')


# if __name__ == '__main__':
#     # This is only for local testing. Deployment to Cloud Functions uses the `main` function.
#     app.run(debug=True, host='localhost', port=8080)

