import { z } from 'zod';

// TODO: Implement the createNoteSchema with Zod
// Requirements:
// - text: string, minimum 3 characters, maximum 500 characters
//   - Error message for min: 'Note must be at least 3 characters'
//   - Error message for max: 'Note must be at most 500 characters'
// - taskId: string, required (minimum 1 character)
//   - Error message: 'Task ID is required'

export const createNoteSchema = z.object({
  // TODO: Implement validation rules
});

// TODO: Implement the deleteNoteSchema with Zod
// Requirements:
// - id: string, required (minimum 1 character)
//   - Error message: 'Note ID is required'

export const deleteNoteSchema = z.object({
  // TODO: Implement validation rules
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;
