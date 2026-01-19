export interface Note {
  id: string;
  text: string;
  taskId: string;
  createdAt: number;
}

// In-memory store
const notesStore: Map<string, Note[]> = new Map();

export const getNotesForTask = (taskId: string): Note[] => {
  if (!notesStore.has(taskId)) {
    notesStore.set(taskId, []);
  }
  return notesStore.get(taskId)!;
};

export const addNoteToStore = (taskId: string, note: Note): void => {
  const notes = getNotesForTask(taskId);
  notes.unshift(note);
  notesStore.set(taskId, notes);
};

export const removeNoteFromStore = (taskId: string, noteId: string): boolean => {
  const notes = getNotesForTask(taskId);
  const index = notes.findIndex((n) => n.id === noteId);
  if (index === -1) return false;
  notes.splice(index, 1);
  notesStore.set(taskId, notes);
  return true;
};

export const findNoteInStore = (taskId: string, noteId: string): Note | undefined => {
  const notes = getNotesForTask(taskId);
  return notes.find((n) => n.id === noteId);
};
