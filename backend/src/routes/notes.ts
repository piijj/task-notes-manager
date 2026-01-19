import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notesController.js';

const router = Router();

// Notes routes
router.get('/:taskId/notes', getNotes);
router.post('/:taskId/notes', createNote);
router.delete('/:taskId/notes/:noteId', deleteNote);

export default router;
