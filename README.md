# Arved ja Naabrid - Frontend

## Käivitamine lokaalselt

cd frontend
npm install
npm run dev

bash
Copy
Edit

API URL seadista `.env` failis:
VITE_API_URL=http://localhost:5001

shell
Copy
Edit

## Docker build

docker build -t arved-ui .
docker run -p 3000:80 arved-ui
