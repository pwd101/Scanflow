# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import os

# REACT_APP_BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'client', 'dist'))

# print("REACT_APP_BUILD_PATH:", REACT_APP_BUILD_PATH)

# app = Flask(__name__, static_folder='client/dist')
# CORS(app)  # Enable CORS for all routes

# @app.route('/api/submit', methods=['POST'])
# def submit_data():
#     data = request.get_json()
#     print('Received data:', data)
#     return jsonify({'message': 'Data received successfully!'}), 200


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
#     app.run(debug=True, host='0.0.0.0', port=8080)

#     """ Production """
#     # from waitress import serve
#     # serve(app, host="0.0.0.0", port=8080)


"""
gcloud functions deploy scanner --gen2 --runtime python312 --region=europe-west9 --trigger-http --allow-unauthenticated --source . --entry-point=main
"""

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel

# Get react app build folder
REACT_APP_BUILD_PATH = "./client/dist"


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins. For production, configure this properly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define data model for submit route request
class SubmitData(BaseModel):
    key1: str
    key2: int
    # Other required/optional fields

@app.post("/api/submit")
async def submit_data(data: SubmitData):
    print("Received data:", data)
    return {"message": "Data received successfully!"}

# Serve React App (Adjusted to use pathlib)
app.mount("/", StaticFiles(directory=REACT_APP_BUILD_PATH, html=True), name="static")


@app.get("/{path:path}")
async def serve_frontend(path: str, request: Request):
    
    static_file_path = Path(REACT_APP_BUILD_PATH) / path
    if static_file_path.is_file():
       return FileResponse(static_file_path)

    index_file_path = Path(REACT_APP_BUILD_PATH) / "index.html"
    return FileResponse(index_file_path)


# if __name__ == "__main__":
#     # For local development
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8080)


# gcloud run deploy scanner --region us-central1 --allow-unauthenticated