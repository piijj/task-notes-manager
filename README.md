# Task Notes Manager - ERN Stack

A full-stack task notes application built with Express, React, and Node.js.

## Project Structure

```
├── backend/          # Express.js API server
│   └── src/
│       ├── controllers/   # Route handlers
│       ├── store/         # In-memory data store
│       ├── routes/        # API routes
│       └── schemas/       # Zod validation schemas
├── frontend/         # React + Vite frontend
│   └── src/
│       ├── components/    # React components
│       ├── store/         # Redux store
│       └── types/         # TypeScript types
└── package.json      # Root scripts
```

## Prerequisites

- Node.js 18+

## Setup

1. **Install dependencies:**

```bash
npm run install:all
```

2. **Run the development servers:**

```bash
npm run dev
```

This starts both:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/:taskId/notes` | Get all notes for a task |
| POST | `/api/tasks/:taskId/notes` | Create a new note |
| DELETE | `/api/tasks/:taskId/notes/:noteId` | Delete a note |
| GET | `/api/health` | Health check |

## Tech Stack

### Backend
- Express.js
- In-memory storage
- Zod for validation
- TypeScript

### Frontend
- React 18
- Redux Toolkit
- Tailwind CSS
- Vite
- TypeScript

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run both frontend and backend in development |
| `npm run dev:backend` | Run backend only |
| `npm run dev:frontend` | Run frontend only |
| `npm run build` | Build both for production |
| `npm run test` | Run frontend tests |
