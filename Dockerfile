# Use official lightweight Python image
FROM python:3.12-slim

# Set environment variables:
# 1. Prevent Python from writing .pyc files to disk
# 2. Prevent Python from buffering stdout/stderr (realtime logs)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000

# Set working directory inside the container
WORKDIR /app

# Copy requirements file first to leverage Docker layer caching
COPY requirements.txt .

# Install dependencies without saving pip cache
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
