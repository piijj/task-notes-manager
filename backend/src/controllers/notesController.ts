import { Request, Response } from 'express';
import { createNoteSchema } from '../schemas/noteSchema.js';
import {
  getNotesForTask,
  addNoteToStore,
  removeNoteFromStore,
  type Note,
} from '../store/notesStore.js';

// GET /api/tasks/:taskId/notes
export const getNotes = (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const notes = getNotesForTask(taskId);
    res.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// POST /api/tasks/:taskId/notes
export const createNote = (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;

    // Validate request body
    const validationResult = createNoteSchema.safeParse({ text, taskId });

    if (!validationResult.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
      return;
    }

    const note: Note = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: validationResult.data.text,
      taskId: validationResult.data.taskId,
      createdAt: Date.now(),
    };

    addNoteToStore(taskId, note);

    res.status(201).json({ note });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// DELETE /api/tasks/:taskId/notes/:noteId
export const deleteNote = (req: Request, res: Response) => {
  try {
    const { taskId, noteId } = req.params;

    const removed = removeNoteFromStore(taskId, noteId);

    if (!removed) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
