# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Set an environment variable that our main.py will use to get react app folder
ENV REACT_APP_BUILD_PATH client/dist

# Expose port 8080 for the Flask app
EXPOSE 8080

# Command to run the Flask application
CMD ["uvicorn", "main:app", "--host", "localhost", "--port", "8080"]
