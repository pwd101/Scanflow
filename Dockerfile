# Use an official Python runtime as a parent image
FROM python:3.12-slim

ENV PYTHONUNBUFFERED True

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Expose port 8080 for the Flask app
EXPOSE 8080

# Command to run the Flask application
# CMD uvicorn main:app --host 0.0.0.0 --port 8080
CMD uvicorn main:app --host localhost --port 8080