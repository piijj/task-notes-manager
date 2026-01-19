import type { Note } from '@/types/note';

// Extend global namespace for type safety
declare global {
  var notesStore: Map<string, Note[]> | undefined;
}

// Shared in-memory store for demo purposes (in real app, this would be a database)
export const notesStore: Map<string, Note[]> = global.notesStore ?? new Map();

// Persist in global for development hot reloading
if (process.env.NODE_ENV !== 'production') {
  global.notesStore = notesStore;
}

// Helper to get or create notes array for a task
export const getNotesForTask = (taskId: string): Note[] => {
  if (!notesStore.has(taskId)) {
    notesStore.set(taskId, []);
  }
  return notesStore.get(taskId)!;
};
