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
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearNotes: (state) => {
      state.notes = [];
      state.error = null;
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
