# Deployment Instructions

## Backend (Flask)

### Local Production Run
1. Install dependencies:
   ```
   cd backend
   ../venv/Scripts/pip install -r requirements.txt
   ```
2. Run with Gunicorn:
   ```
   gunicorn app:app
   ```
   (Or use `python app.py` for development)

### Cloud Deployment (Render/Heroku)
- Use the `Procfile` and push your repo to Render or Heroku.
- Set your MongoDB URI as an environment variable if using MongoDB Atlas.

## Frontend (React/Vite)

### Local Production Build
1. Build static files:
   ```
   npm run build
   ```
2. Serve with a static server:
   ```
   npx serve dist
   ```
   (Or deploy `dist/` to Vercel/Netlify)

### Cloud Deployment (Vercel/Netlify)
- Connect your repo and set build command to `npm run build`, output directory to `dist`.

---

## Unified Local Run (Dev)
- Run backend: `python backend/app.py`
- Run frontend: `npm run dev`

---

## Notes
- Update MongoDB connection string in `backend/app.py` for cloud deployments.
- For questions, see the main README or ask your assistant. 