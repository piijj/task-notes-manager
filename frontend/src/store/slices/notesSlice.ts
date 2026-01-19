import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Note } from '../../types/note';

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      // TODO: Implement
    },
    addNote: (state, action: PayloadAction<Note>) => {
      // TODO: Implement
    },
    removeNote: (state, action: PayloadAction<string>) => {
      // TODO: Implement
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // TODO: Implement
    },
    setError: (state, action: PayloadAction<string | null>) => {
      // TODO: Implement
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      // TODO: Implement
    },
    clearNotes: (state) => {
      // TODO: Implement
    },
  },
});

export const {
  setNotes,
  addNote,
  removeNote,
  setLoading,
  setError,
  setSearchQuery,
  clearNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
