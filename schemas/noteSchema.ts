import { z } from 'zod';

export const createNoteSchema = z.object({
  text: z.string().min(3, 'Note must be at least 3 characters').max(500, 'Note must be at most 500 characters'),
  taskId: z.string().min(1, 'Task ID is required'),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1, 'Note ID is required'),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;
