import { describe, it, expect } from 'vitest';
import notesReducer, { setNotes, addNote, removeNote, setLoading, setError } from '@/store/slices/notesSlice';
import type { Note } from '@/types/note';

const mockNote: Note = {
  id: 'note-1',
  text: 'Test note',
  taskId: 'task-1',
  createdAt: Date.now(),
};

describe('notesSlice', () => {
  it('should handle initial state', () => {
    const initialState = notesReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual({
      notes: [],
      loading: false,
      error: null,
    });
  });

  it('should handle setNotes', () => {
    const notes: Note[] = [mockNote];
    const action = setNotes(notes);
    const state = notesReducer(undefined, action);
    expect(state.notes).toEqual(notes);
    expect(state.error).toBeNull();
  });

  it('should handle addNote immutably', () => {
    const initialState = {
      notes: [],
      loading: false,
      error: null,
    };
    const action = addNote(mockNote);
    const state = notesReducer(initialState, action);
    expect(state.notes).toHaveLength(1);
    expect(state.notes[0]).toEqual(mockNote);
    expect(state.notes).not.toBe(initialState.notes); // Immutability check
  });

  it('should handle removeNote immutably', () => {
    const initialState = {
      notes: [mockNote],
      loading: false,
      error: null,
    };
    const action = removeNote('note-1');
    const state = notesReducer(initialState, action);
    expect(state.notes).toHaveLength(0);
    expect(state.notes).not.toBe(initialState.notes); // Immutability check
  });

  it('should handle setLoading', () => {
    const action = setLoading(true);
    const state = notesReducer(undefined, action);
    expect(state.loading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'Test error';
    const action = setError(errorMessage);
    const state = notesReducer(undefined, action);
    expect(state.error).toBe(errorMessage);
  });
});
