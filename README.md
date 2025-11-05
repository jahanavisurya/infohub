# InfoHub — ByteXL Challenge (Minimal Scaffold)

This ZIP contains a minimal full-stack scaffold for the InfoHub challenge:
- Frontend: React (Vite)
- Backend: Node + Express

Run backend:
  cd backend
  npm install
  npm run dev    # requires nodemon OR npm start

Run frontend:
  cd frontend
  npm install
  npm run dev

The backend has three routes:
  GET /api/weather?city=CityName
  GET /api/convert?amount=100&from=INR&to=USD
  GET /api/quote
