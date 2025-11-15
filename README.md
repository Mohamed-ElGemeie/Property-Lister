# Property-Lister

Lightweight property-listing web application (NestJS backend + Next.js frontend) with a PostgreSQL database, prepared to run locally or inside Docker.

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

**Quick summary:** a simple listings service exposing a small REST API to create and retrieve property/apartment listings and a Next.js frontend that consumes that API.

---

**Contents**

- What it is
- Why it is useful
- Getting started (Docker and local development)
- Examples (API snippets)
- Help & resources
- Maintainers & contributing

---

## What the project does

Property-Lister provides:

- A NestJS backend that stores apartment listings in PostgreSQL and exposes endpoints under `/apartments`.
- A Next.js frontend (in `/frontend`) that lists properties and integrates with the backend.
- Docker Compose configuration to bring up the database, seed/init scripts and both services for local development.

Key server endpoints (backend):

- `GET /apartments` — list all apartments
- `GET /apartments/:id` — get one apartment (UUID)
- `POST /apartments` — create a new apartment (see example payload below)

## Why this project is useful

- Small, focused codebase that demonstrates a complete full-stack flow (DB → API → frontend).
- Ready-to-run Docker setup for reproducible local development and CI experiments.
- Includes example tests and DB seed/init scripts to quickly populate a working dataset.

## Getting started

Prerequisites

- Node.js (recommended: 18+)
- npm
- Docker & Docker Compose (if using Docker)

There are two main ways to run the project: with Docker Compose (recommended for parity) or locally (dev mode).

### Quick start — Docker Compose (recommended)

1. Copy or create environment files used by the Compose services. An example `.env.example` is provided at the repo root.

	- `docker-compose.yml` expects `./database/.env`, `./backend/.env` and `./frontend/.env`.
	- You can reuse the root `.env.example` as a starting point. For example, create `database/.env` and fill values.

2. Build and run everything:

```cmd
docker-compose up --build
```

3. **Wait for the backend to be ready.** Monitor the logs and wait until you see:

```
backend | [Nest] 242  - 11/15/2025, 4:15:15 PM     LOG [NestApplication] Nest application successfully started
```

This indicates the backend has initialized, connected to the database, and is ready to accept requests.

4. Once the backend is ready, you can access the services:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3001 | Web interface for browsing and creating listings |
| **Backend API** | http://localhost:3000 | REST API endpoints (e.g., `/apartments`) |
| **Database** | localhost:5432 | PostgreSQL (internal only) |

Notes:

- The `db-init` service runs database drop/init/seed scripts and the e2e tests defined in `database/` before continuing.
- The frontend automatically connects to the backend at `http://localhost:3000` (ensure this is set in `./frontend/.env`).
- All services run in the same Docker network and can communicate internally.

### Local development (without Docker)

Backend (NestJS)

```cmd
cd backend
npm install
copy ..\.env.example .env  (adjust environment values in .env)
npm run start:dev
```

Frontend (Next.js)

```cmd
cd frontend
npm install
copy ..\.env.example .env  (set `API_URL` to your backend, e.g. http://localhost:3000)
npm run dev
```

Run backend tests

```cmd
cd backend
npm run test
npm run test:e2e
```

## Environment variables consistency

Certain environment variables must be kept consistent across the repository to ensure services, scripts and Docker Compose can communicate correctly.

- Database password: set the same `DB_PASSWORD` value in these files (used by compose and DB scripts):
	- `./.env` (root)
	- `./database/.env`
	- `./backend/.env`

	These values are used to construct `DATABASE_URL` for database initialization and by the backend server when connecting to Postgres. If they differ, the backend or the DB-init scripts may fail to connect or the seed scripts may target a different database.

- Shared secret: set the same `SECRET` value in both:
	- `./backend/.env` (server secret used to authorize requests)
	- `./frontend/.env` (used by the example frontend to send the same Bearer token)

	The frontend in this repository reads `SECRET` to include the `Authorization: Bearer <SECRET>` header when calling protected backend endpoints. In production you should not store secrets in client-side code; this setup is only for local development and tests.

Recommendations

- Choose a strong `DB_PASSWORD` and a strong `SECRET` and copy them into the files above. You can use the provided `./.env.example` as a template for variable names.
- Keep secret values out of commits. The repository `.gitignore` already excludes `.env` files — do not commit real secrets.
- If you prefer a single source of truth, keep a canonical `.env` (for example at repo root) and copy the relevant values into `./database/.env`, `./backend/.env`, and `./frontend/.env` before starting the stack.

Example (manual): open each file and set the same values:

```text
# in ./.env, ./database/.env and ./backend/.env
DB_PASSWORD=your-db-password-here

# in ./backend/.env and ./frontend/.env
SECRET=some-strong-secret
```

If you want, I can add a small script to propagate values from a single file into the others (keeps secrets local). Let me know if you'd like that.

## API examples

List apartments (GET):

```bash
curl http://localhost:3000/apartments
```

Create apartment (POST) — example JSON body:

```bash
curl -X POST http://localhost:3000/apartments -H "Content-Type: application/json" -d "{
	\"name\": \"Cozy Downtown Flat\",
	\"max_guests\": 4,
	\"bedrooms\": 2,
	\"bathrooms\": 1,
	\"beds\": 2,
	\"longitude\": 31.2357,
	\"latitude\": 30.0444,
	\"price\": 45.00,
	\"images\": [\"/images/1.jpg\", \"/images/2.jpg\"],
	\"city\": \"Cairo\",
	\"country\": \"Egypt\"
}"
```

The `CreateApartmentDto` in the backend enforces validation (required fields, types and ranges). See `/backend/src/modules/apartments/dto/create-apartment.dto.ts` for the exact schema.


## Project layout (short)

- `backend/` — NestJS API server and tests
- `frontend/` — Next.js app
- `database/` — DB Dockerfile, seed/init/drop scripts and tests
- `docker-compose.yml` — development compose setup

---

If you'd like, I can also:

- add a minimal `CONTRIBUTING.md` template
- add GitHub Actions CI example for tests
- add example `.env` files (safely excluding secrets)

Feel free to tell me which of these you'd like next.
