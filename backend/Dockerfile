# ARCKAE Backend (FastAPI)
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Application code (no .env; use env vars or docker-compose env_file)
COPY . .

EXPOSE 8000

# Render sets PORT; default 8000 for local/docker-compose
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
