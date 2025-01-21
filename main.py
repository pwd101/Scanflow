from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel

# Get react app build folder
REACT_APP_BUILD_PATH = "client/dist"


app = FastAPI()

# # Enable CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins. For production, configure this properly
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Define data model for submit route request
# class SubmitData(BaseModel):
#     key1: str
#     key2: int
#     # Other required/optional fields

# @app.post("/api/submit")
# async def submit_data(data: SubmitData):
#     print("Received data:", data)
#     return {"message": "Data received successfully!"}

# # Serve React App (Adjusted to use pathlib)
# app.mount("/", StaticFiles(directory=REACT_APP_BUILD_PATH, html=True), name="static")


# @app.get("/{path:path}")
# async def serve_frontend(path: str):
#     print("path", path)
#     return "test"
#     static_file_path = Path(REACT_APP_BUILD_PATH) / path
#     if static_file_path.is_file():
#        return FileResponse(static_file_path)

#     index_file_path = Path(REACT_APP_BUILD_PATH) / "index.html"
#     print("i", index_file_path)
#     return FileResponse(index_file_path)

@app.get("/")
async def serve_frontend():
    return "test"

    # index_file_path = Path(REACT_APP_BUILD_PATH) / "index.html"
    # print("i", index_file_path)
    # return FileResponse(index_file_path)


# if __name__ == "__main__":
#     # For local development
#     import uvicorn
#     uvicorn.run(app, host="localhost", port=8080)


# gcloud run deploy scanner --region us-central1 --allow-unauthenticated
"""
gcloud run deploy scanflow1 --region=europe-west9 --min-instances=1 --concurrency=20 --memory=258Mi --allow-unauthenticated --timeout=60 --source .
"""