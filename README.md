# ARCKAE Website

ARCKAE is a modern, static marketing website for an education consultancy. The current version is designed to run entirely as a front-end site, with no backend or database required for deployment.

## What this project includes

- React + TypeScript + Vite front end
- Static content for the main pages and FAQ section
- No server-side processes, API dependencies, or database requirements
- Responsive design that preserves the existing UI flow and structure

## Local development

From the project root, run:

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Production build

To generate the static files for deployment:

```bash
cd frontend
npm run build
```

The build output will be written to the dist folder.

## Deploying on Render as a static site

This repository is now set up for deployment as a Render Static Site.

### Option 1: Deploy with the included Render blueprint

1. In the Render dashboard, create a new project and connect this repository.
2. Render will detect the included render.yaml configuration.
3. It will create a static site using the frontend folder.
4. The build command is:

```bash
npm install && npm run build
```

5. The publish directory is:

```bash
dist
```

### Option 2: Deploy manually

1. Create a new Static Site in Render.
2. Set the root directory to frontend.
3. Use the build command:

```bash
npm install && npm run build
```

4. Set the publish directory to dist.
5. Leave the site as a static deployment; no backend service is required.

### SPA routing support

The render.yaml file includes a rewrite rule so routes such as /services, /faq, and /contact work correctly when refreshed directly in the browser.

## Pointing your custom domain to Render

Once the static site is deployed:

1. Open the Render dashboard for the site.
2. Go to Custom Domains.
3. Click Add Custom Domain.
4. Enter your domain, such as www.yourdomain.com or yourdomain.com.
5. Render will provide the DNS values to add at your domain registrar.

### DNS guidance

- For a subdomain such as www, add a CNAME record pointing to the Render target shown in the dashboard.
- For the root/apex domain such as example.com, use the ALIAS/ANAME or A record values Render provides.
- After DNS propagation, your site will be available at the custom domain.

## Notes on the current static setup

- The public website content is now fully static and does not depend on a backend service.
- The contact form shows a success confirmation locally and does not require a server endpoint to function in the current version.
- Staff login, dashboard, and database-backed features are not part of the static deployment model.

## Project structure

- frontend/src/app/pages — route-based page components
- frontend/src/app/components — shared layout and navigation components
- frontend/src/app/data/staticContent.ts — local static content used by the site
- render.yaml — Render deployment configuration for a static site

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
