# Crypto Trading Bot Dashboard

This project is a full-stack application that provides a real-time dashboard for monitoring cryptocurrency prices and trading signals.

## Tech Stack

### Backend
- Python
- Flask & Flask-SocketIO
- MongoDB
- Gunicorn

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js and npm
- Python 3.11+ and pip
- A running MongoDB instance (local or on a cloud service like MongoDB Atlas)

### Backend Setup
1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Create and activate a Python virtual environment:
    ```sh
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```
3.  Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```
4.  Create a `.env` file in the `backend` directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
5.  Run the backend server:
    ```sh
    flask run
    ```

### Frontend Setup
1.  From the project root, install the npm packages:
    ```sh
    npm install
    ```
2.  Create a `.env.local` file in the root directory and add the URL of your running backend:
    ```
    VITE_BACKEND_URL=http://127.0.0.1:5000
    ```
3.  Start the frontend development server:
    ```sh
    npm run dev
    ```

## Deployment

This application is configured for deployment on:

-   **Backend**: [Render](https://render.com/), using the `render.yaml` configuration file.
-   **Frontend**: [Netlify](https://www.netlify.com/), using the `netlify.toml` configuration file.
