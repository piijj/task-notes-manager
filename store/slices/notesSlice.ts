import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Note, NotesState } from '@/types/note';

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.error = null;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [...state.notes, action.payload];
      state.error = null;
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
  },
});

export const { setNotes, addNote, removeNote, setLoading, setError } = notesSlice.actions;
export default notesSlice.reducer;
