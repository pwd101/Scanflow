from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os
from concurrent.futures import ThreadPoolExecutor
from pubsub import publish_message
# from google.cloud import firestore


PROJECT_ID = "qr-code-decideomtour-scanflow" 
REACT_APP_BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'dist'))
SCAN_TOPIC_ID = "scanflow-scan-event-topic"

executor = ThreadPoolExecutor(max_workers=10)

# pubsub_msg_dict  = {'surname': 'ALLIAUME', 'name': 'Aurore', 'email': 'aalliaume@nhood.com', 'company': 'Nhood', 'qr_text': '"ALLIAUME"; "Aurore"; "aalliaume@nhood.com"; "Nhood"', 'scan_time': '2025-01-27T10:25:07.473Z'}
# publish_message(PROJECT_ID, SCAN_TOPIC_ID, pubsub_msg_dict)


# firestore_db = firestore.Client(project=PROJECT_ID)
# docref = doc_ref = firestore_db.collection("test_coll").document("test_doc")
# doc_ref_infos = doc_ref.get().to_dict()
# print(doc_ref.get().to_dict())

app = Flask(__name__, static_folder='client/dist')
CORS(app) 

@app.route('/api/submit', methods=['POST'])
def submit_data():
    pubsub_msg_dict = request.get_json(force=True, silent=True)

    if not pubsub_msg_dict:
        return {'error': 'Invalid JSON data'}, 400

    required_keys = ["surname", "name", "email", "company", "city", "location", "scan_time"]
    if not all(key in pubsub_msg_dict for key in required_keys):
        return {'error': 'Missing required fields'}, 400

    scan_id_trans = str.maketrans({'-': '', ':': '', 'T': '_', 'Z': ''})
    try:
        data = {
            "scan_id": f"{pubsub_msg_dict["scan_time"].translate(scan_id_trans)}",
            "surname": pubsub_msg_dict["surname"],
            "name": pubsub_msg_dict["name"],
            "email": pubsub_msg_dict["email"],
            "company": pubsub_msg_dict["company"],
            "city": pubsub_msg_dict["city"],
            "location": pubsub_msg_dict["location"],
            "scan_time": pubsub_msg_dict["scan_time"],
        }

        print('Received data:', data)
        # publish_message(PROJECT_ID, SCAN_TOPIC_ID, data)
        executor.submit(publish_message, PROJECT_ID, SCAN_TOPIC_ID, data)
        return data, 200
    except KeyError as e:
        return {'error': f'Missing field: {e}'}, 400
    
    


# Serve React App
@app.route('/', defaults={'path': ''}, methods=['GET'])
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # Local testing
    app.run(debug=True, host='localhost', port=8080)

