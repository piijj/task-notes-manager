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
      // TODO: Implement - set the notes array from action.payload
    },
    addNote: (state, action: PayloadAction<Note>) => {
      // TODO: Implement - add note to the BEGINNING of the array (newest first)
    },
    removeNote: (state, action: PayloadAction<string>) => {
      // TODO: Implement - remove note by id (action.payload is the note id)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // TODO: Implement - set loading state
    },
    setError: (state, action: PayloadAction<string | null>) => {
      // TODO: Implement - set error message
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      // TODO: Implement - set search query
    },
    clearNotes: (state) => {
      // TODO: Implement - clear all notes and reset error to null
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
