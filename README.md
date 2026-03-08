## ARCKAE Study Abroad Website

This repository contains the full‑stack implementation of the **ARCKAE Study Abroad Agency** website:

- **Frontend**: React + TypeScript + Vite (in the `arckae` directory)
- **Backend**: FastAPI + PostgreSQL + JWT auth (in the `backend` directory)

The site targets students, parents, and young professionals seeking end‑to‑end study abroad support (IELTS training, career guidance, school applications, visa support, and post‑arrival services).

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
An example file is provided as `.env.example`.

### Default PostgreSQL URL

By default, if you do not set `DATABASE_URL` explicitly, the backend uses:

```text
postgresql+psycopg://postgres:postgres@localhost:5432/arckae
```

This corresponds to:

- **User**: `postgres`
- **Password**: `postgres`
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `arckae`

You can keep this default for local development or change it to match your own PostgreSQL setup.

### Creating the database locally

On a machine with PostgreSQL installed:

```bash
createdb arckae
```

Or, inside `psql`:

```sql
CREATE DATABASE arckae;
```

### Setting up the `.env` file

1. Copy the example:

   ```bash
   cp .env.example .env
   ```

2. Adjust values as needed:

   - `DATABASE_URL` – PostgreSQL connection string (see default above)
   - `JWT_SECRET_KEY` – long random secret for JWT signing
   - `CORS_ORIGINS` – comma‑separated list of frontend URLs (e.g. `http://localhost:5173`)
   - `SMTP_*` – optional SMTP values for email notifications from the contact/appointment form

If SMTP settings are not configured, the backend will simply skip sending emails (no crash).

---

## Running the Backend (FastAPI)

From the project root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

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

## Running the Frontend (React)

From the project root:

```bash
cd arckae
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

The frontend will be wired to call the FastAPI backend (for example at `http://localhost:8000`) for services, FAQs, contact/appointment submissions, and staff login.

---

## Next Steps (High Level)

- Build out all ARCKAE‑specific pages (Landing, About, Services, Destinations, Location with Google Maps link, Contact/Booking, FAQ).
- Implement a staff‑only entry flow (secret key / email check) that leads to the Admin/Counsellor login.
- Create an in‑browser admin panel for managing Services, FAQs, Users, and Appointments via the FastAPI API.

# ARCKAE-Website
Client: ARCKAE EDUCATION AGENCY LTD
