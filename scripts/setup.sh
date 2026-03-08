#!/usr/bin/env bash
# One-time setup: PostgreSQL, database, .env, backend deps, tables, and seed.
# Run from project root: ./scripts/setup.sh

set -e
cd "$(dirname "$0")/.."
PROJECT_ROOT="$PWD"

echo "=== ARCKAE one-time setup ==="

# 1. Start PostgreSQL (ignore if already running or not installed)
if command -v systemctl &>/dev/null; then
  sudo service postgresql start 2>/dev/null || true
elif command -v service &>/dev/null; then
  sudo service postgresql start 2>/dev/null || true
fi

# 2. Set postgres user password to 'postgres' so default DATABASE_URL works (ignore errors)
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';" 2>/dev/null || true

# 3. Create database if it doesn't exist
sudo -u postgres createdb arckae 2>/dev/null || true

# 4. .env from .env.example if missing
if [ ! -f "$PROJECT_ROOT/.env" ]; then
  cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
  echo "Created .env from .env.example"
else
  echo ".env already exists"
fi

# 5. Backend venv and deps
cd "$PROJECT_ROOT/backend"
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
  echo "Created backend .venv"
fi
source .venv/bin/activate
python3 -m pip install -q -r requirements.txt
echo "Backend dependencies installed"

# 6. Create tables and seed
python3 seed.py
echo "Database tables created and seed data loaded."

echo ""
echo "=== Setup complete ==="
echo "Start the app:"
echo "  Terminal 1:  cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo "  Terminal 2:  cd frontend && npm install && npm run dev"
echo "Then open: http://localhost:5173"
echo ""
