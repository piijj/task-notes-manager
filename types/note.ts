export interface Note {
  id: string;
  text: string;
  taskId: string;
  createdAt: number;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}
