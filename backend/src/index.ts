import cors from 'cors';
import express from 'express';
import notesRoutes from './routes/notes.js';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', notesRoutes);

// Health check
app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running on http://0.0.0.0:${PORT}`);
});
