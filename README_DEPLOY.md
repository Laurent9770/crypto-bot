# Deployment Guide: Flask + React + MongoDB

## Backend (Flask) on Render
1. Sign up at https://render.com
2. Click "New Web Service" and connect your repo
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `gunicorn --worker-class eventlet -w 1 backend.app:app`
5. Add environment variables from backend/.env.example
6. Deploy and note your backend URL

## Frontend (React) on Netlify
1. Sign up at https://netlify.com
2. Drag and drop your `dist/` folder or connect your repo
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable VITE_BACKEND_URL with your Render backend URL
6. Deploy and note your frontend URL

## MongoDB (Atlas)
1. Go to https://cloud.mongodb.com
2. Create a free cluster, database, and user
3. Get your connection string and add to Render as MONGO_URI

## WebSocket Connection
- The frontend uses VITE_BACKEND_URL to connect to the backend for live updates.
- Make sure CORS is enabled in Flask (already set in backend/app.py)

## Troubleshooting
- If you see CORS or WebSocket errors, check your environment variables and URLs.
- Make sure both backend and frontend are deployed and accessible. 