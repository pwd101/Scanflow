from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel
import os 

# Get react app build folder
REACT_APP_BUILD_PATH = os.path.join("client", "dist")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory=REACT_APP_BUILD_PATH, html=True), name="assets")

class SubmitData(BaseModel):
    name: str
    surname: str
    email: str
    company: str
    scan_time: str
    qr_text: str

@app.post("/api/submit")
async def submit_data(data: SubmitData):
    print("Received data:", data)
    return {"message": "Data received successfully!"}



# Make it return the index.html on non `/static` requests
@app.get("/{path:path}")
async def catch_all(path: str):
    # Return the index.html file for all other paths
    # This will handle all the react router routes
    return FileResponse(os.path.join("app","client", "index.html"))



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8080)
    # uvicorn.run(app, host="localhost", port=8080)


"""
gcloud run deploy scanflow1 --region=europe-west9 --min-instances=1 --concurrency=20 --memory=256Mi --allow-unauthenticated --timeout=60 --source .
"""


# @app.get("/")
# async def serve_frontend():
#     # index_file_path = Path(REACT_APP_BUILD_PATH) / "index.html"
#     index_file_path = "client/dist/index.html"
#     return "FileResponse(index_file_path)"


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