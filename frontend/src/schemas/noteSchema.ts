import { z } from 'zod';

// TODO: Implement validation schema for creating a note
export const createNoteSchema = z.object({
  // TODO: Add validation rules
});

// TODO: Implement validation schema for deleting a note
export const deleteNoteSchema = z.object({
  // TODO: Add validation rules
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;
