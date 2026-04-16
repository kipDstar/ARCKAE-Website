## ARCKAE Study Abroad Website

This repository contains the full‑stack implementation of the **ARCKAE Study Abroad Agency** website:

- **Frontend**: React + TypeScript + Vite (in the `frontend` directory)
- **Backend**: FastAPI + PostgreSQL + JWT auth (in the `backend` directory)

---

## Quick start (one-time setup)

From the project root, run:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

This script will (you may be asked for your sudo password):

1. Start PostgreSQL if installed
2. Set the `postgres` user password to `postgres` 
3. Create the `arckae` database
5. Create a Python venv in `backend`, install dependencies, create tables, and seed data

Then start the app in **two terminals**:

- **Terminal 1:** `cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
- **Terminal 2:** `cd frontend && npm install && npm run dev`

Open **http://localhost:5173** in your browser.

---

## Deploying on Render

This repo has **two** Dockerfiles (`backend/Dockerfile` and `frontend/Dockerfile`). Render only lets you set one “Dockerfile path” per service, so you use **two separate Web Services** (and optionally one Postgres) from the same repo.

**Do not** set the Dockerfile path to `docker-compose.yml` — Render will try to parse it as a Dockerfile and fail.

**Option A — Blueprint (recommended)**  
Use the included `render.yaml` so both services and the DB are defined in one place:

1. In the [Render Dashboard](https://dashboard.render.com), connect the repo and choose **Blueprint**.
2. Point Render at the repo; it will detect `render.yaml` and create:
   - **arckae-backend** (Docker, root dir `backend`)
   - **arckae-frontend** (Docker, root dir `frontend`)
   - **arckae-db** (Postgres)
3. When prompted, set **CORS_ORIGINS** for the backend to your frontend URL (e.g. `https://arckae-frontend-xxxx.onrender.com`).
4. After the first deploy, run the seed once via **Shell** on the backend service: `python seed.py`.

**Option B — Manual**  
Create two Web Services from the same repo:

- **Backend:** Root Directory = `backend`, Dockerfile Path = `Dockerfile`. Add a Postgres (or external DB) and set `DATABASE_URL`.
- **Frontend:** Root Directory = `frontend`, Dockerfile Path = `Dockerfile`. The frontend gets the backend URL via Render’s private networking (see `render.yaml`).

---

## Docker (full stack)

From the project root, with a `.env` file in place (copy from `.env.example` if needed):

```bash
docker compose up --build
```

- **Frontend:** http://localhost (port 80) — nginx serves the app and proxies `/api` to the backend.
- **Backend:** http://localhost:8000 (direct).
- **PostgreSQL** runs in a container; data is stored in a Docker volume.

**First-time seed (admin user, services, FAQs):** after the stack is up, run once:

```bash
docker compose exec backend python seed.py
```

Then use staff gate and login as in **Staff access** below (e.g. `admin@arckae.com` / `admin123`).

---

## Staff access (all 3 account levels)

After setup, the seed creates one **admin** user. Staff must pass the **staff gate** before the login page.

| Level      | How to get an account | After login |
|-----------|------------------------|-------------|
| **Admin** | Seeded: `******` / `******`. Or create via `POST /api/auth/register` when no users exist (no token), or create more admins when logged in as admin. | Full dashboard: appointments, services, FAQs, users. |
| **Counsellor** | Admin creates via Dashboard → Users → Add User (role: Counsellor). | Dashboard: overview + appointments (only their assigned ones). |
| **Visitor** | Admin creates via Dashboard → Users (role: Visitor). Or `POST /api/auth/register` with a valid admin token. | No dashboard access; used for non-staff accounts. |

**Staff gate (before login):**

1. Go to **/staff**.
2. Enter a staff **email**  and the **access key** from your `.env`.  
3. If the key matches and the email is an admin or counsellor, you are sent to **/login**.
4. Log in with that user’s **email** and **password** 

---

## Tech Stack

- **Frontend**
  - React + TypeScript (Vite)
  - TailwindCSS (utility‑first styling)
  - React Router for navigation
- **Backend**
  - FastAPI (Python)
  - PostgreSQL with SQLAlchemy ORM
  - JWT‑based authentication and role‑based access (Admin, Counsellor, Visitor)
  - Email notifications via SMTP (optional)

---

## Environment & Database Configuration

The backend reads configuration from a `.env` file at the **project root**.

### Default PostgreSQL URL

By default, if you do not set `DATABASE_URL` explicitly, the backend uses:

```text
postgresql+psycopg://postgres:postgres@localhost:****/****
```

### When to create the database 

**Create the database before starting the backend.** The backend connects to PostgreSQL as soon as it starts; if the `arckae` database doesn’t exist yet, the app will fail to start.

**Order:**

1. Install and start PostgreSQL (if not already running).
2. Create the database (see below).
3. Optionally copy `.env.example` to `.env` and set `DATABASE_URL` if you use different credentials.
4. Start the backend (`uvicorn app.main:app ...`). On first run it will create the tables inside `arckae`.

### Creating the database locally

On a machine with PostgreSQL installed, run **before** starting the backend:

```bash
createdb arckae
```

Or, inside `psql`:

```sql
CREATE DATABASE arckae;
```

### What does "Active: active (exited)" mean for PostgreSQL?

When you run `sudo service postgresql status`, you may see **Active: active (exited)**. That's normal: the main `postgresql` service starts the real database process and then exits. The database is still running. To double-check, run: `pg_isready -h localhost` (should print "accepting connections").

### If you get “password authentication failed for user postgres”

The default `DATABASE_URL` uses a password . If PostgreSQL rejects it, set that password:

```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '******';"
```

Or use a different password and put it in `.env`:

---

## How to run the app (simple steps)

You need **two terminals**: one for the backend, one for the frontend.

**Quick copy-paste (after you have PostgreSQL and a `.env` file):**

- **Terminal 1 (backend):**  
  `cd backend && python3 -m venv .venv && source .venv/bin/activate && python3 -m pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
- **Terminal 2 (frontend):**  
  `cd frontend && npm install && npm run dev`

Then open **http://localhost:5173** in your browser.  
*(If you get “pip not found”, use `python3 -m pip` instead of `pip` in the step-by-step section below.)*

---

### Terminal 1 — Backend (API server)

Run these commands **one at a time** in order:

| Step | Command | What it does |
|------|---------|--------------|
| 1 | `cd backend` | Go into the backend folder |
| 2 | `python3 -m venv .venv` | Create a virtual environment (installs Python packages here only) |
| 3 | `source .venv/bin/activate` | Turn on the virtual environment (your prompt may show `(.venv)`) |
| 4 | `python3 -m pip install -r requirements.txt` | Install backend dependencies (FastAPI, database, etc.) |
| 5 | `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` | Start the API server |

When you see something like `Uvicorn running on http://0.0.0.0:8000`, the backend is running. Leave this terminal open.

**If step 4 says "pip not found":** you can install pip with `sudo apt install python3-pip`, or just use `python3 -m pip install -r requirements.txt` (step 4 already uses this).

**If `uvicorn` says "not found":** make sure you ran step 3 (activate the venv), then run step 4 again. Uvicorn is installed by step 4.

---

### Terminal 2 — Frontend (website)

Open a **new** terminal. Run these **one at a time**:

| Step | Command | What it does |
|------|---------|--------------|
| 1 | `cd frontend` | Go into the frontend folder |
| 2 | `npm install` | Install frontend dependencies |
| 3 | `npm run dev` | Start the website dev server |

When you see something like `Local: http://localhost:****/`, open that URL in your browser. The site will talk to the backend on port 8000 automatically.

---

### Optional: database and first-time setup

- **PostgreSQL:** The backend expects a database. If you don’t have one yet, create it (e.g. `createdb arckae` if you have PostgreSQL), and set `DATABASE_URL` in a `.env` file in the project root 
- **Seed data:** From the project root, run `cd backend && source .venv/bin/activate && python3 seed.py` to load sample services, FAQs, and an admin user.

---

## Backend API (reference)

The API will be available at `http://localhost:8000`.

Key routes:

- `GET /api/health` – health check
- `POST /api/auth/login` – staff login (Admin/Counsellor)
- `POST /api/auth/register` – create users (first user or admin‑only afterward)
- `GET /api/services` – public list of main and auxiliary services
- `GET /api/faqs` – public FAQ listing
- `POST /api/contact` – public contact / appointment submission
- `GET /api/appointments` – appointments list (Admin/Counsellor)
- `PUT /api/appointments/{id}` – update appointment status, counsellor, date, and mode

---

*(Frontend run steps are in the "How to run the app" section above — use the `frontend` folder and `npm run dev`.)*

---

## Next Steps (High Level)

- Build out all ARCKAE‑specific pages (Landing, About, Services, Destinations, Location with Google Maps link, Contact/Booking, FAQ).
- Implement a staff‑only entry flow (secret key / email check) that leads to the Admin/Counsellor login.
- Create an in‑browser admin panel for managing Services, FAQs, Users, and Appointments via the FastAPI API.

# ARCKAE-Website
Client: ARCKAE EDUCATION AGENCY LTD

Docker setup

File	Purpose
backend/Dockerfile	Python 3.12-slim image; installs deps and runs uvicorn on port 8000.
backend/.dockerignore	Excludes .venv, __pycache__, .env, etc.
frontend/Dockerfile	Multi-stage: Node 20 build → npm run build; then nginx:alpine serves dist/ and proxies /api to the backend.
frontend/nginx.conf	SPA fallback + location /api/ → http://backend:8000/api/.
frontend/.dockerignore	Excludes node_modules, dist, .env.
docker-compose.yml	Defines postgres, backend, frontend; uses host .env via env_file and overrides DATABASE_URL and CORS_ORIGINS for the backend.
Run with Docker

# From project root (ensure .env exists; copy from .env.example if needed)
docker compose up --build
App: http://localhost (frontend; nginx on 80).
API: http://localhost:8000 or via http://localhost/api/....
Seed the database once after first start:

docker compose exec backend python seed.py
Then use staff gate and login (e.g. admin@arckae.com / admin123) as in the README.
