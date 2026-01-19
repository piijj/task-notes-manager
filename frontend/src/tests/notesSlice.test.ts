import { describe, expect, it } from 'vitest';
import notesReducer, {
	addNote,
	clearNotes,
	removeNote,
	setError,
	setLoading,
	setNotes,
	setSearchQuery,
} from '../store/slices/notesSlice';
import type { Note } from '../types/note';

const mockNote: Note = {
	id: 'note-1',
	text: 'Test note',
	taskId: 'task-1',
	createdAt: Date.now(),
};

const mockNote2: Note = {
	id: 'note-2',
	text: 'Another test note',
	taskId: 'task-1',
	createdAt: Date.now(),
};

describe('notesSlice', () => {
	const initialState = {
		notes: [],
		loading: false,
		error: null,
		searchQuery: '',
	};

	describe('setNotes', () => {
		it('should set notes array', () => {
			const notes = [mockNote, mockNote2];
			const state = notesReducer(initialState, setNotes(notes));
			expect(state.notes).toEqual(notes);
			expect(state.notes.length).toBe(2);
		});

		it('should replace existing notes', () => {
			const stateWithNotes = { ...initialState, notes: [mockNote] };
			const newNotes = [mockNote2];
			const state = notesReducer(stateWithNotes, setNotes(newNotes));
			expect(state.notes).toEqual(newNotes);
			expect(state.notes.length).toBe(1);
		});
	});

	describe('addNote', () => {
		it('should add a note to the beginning of the array', () => {
			const stateWithNotes = { ...initialState, notes: [mockNote] };
			const state = notesReducer(stateWithNotes, addNote(mockNote2));
			expect(state.notes.length).toBe(2);
			expect(state.notes[0]).toEqual(mockNote2);
		});

		it('should add note to empty array', () => {
			const state = notesReducer(initialState, addNote(mockNote));
			expect(state.notes.length).toBe(1);
			expect(state.notes[0]).toEqual(mockNote);
		});
	});

	describe('removeNote', () => {
		it('should remove a note by id', () => {
			const stateWithNotes = { ...initialState, notes: [mockNote, mockNote2] };
			const state = notesReducer(stateWithNotes, removeNote('note-1'));
			expect(state.notes.length).toBe(1);
			expect(state.notes[0].id).toBe('note-2');
		});
	});

	describe('setLoading', () => {
		it('should set loading to true', () => {
			const state = notesReducer(initialState, setLoading(true));
			expect(state.loading).toBe(true);
		});

		it('should set loading to false', () => {
			const loadingState = { ...initialState, loading: true };
			const state = notesReducer(loadingState, setLoading(false));
			expect(state.loading).toBe(false);
		});
	});

	describe('setError', () => {
		it('should set error message', () => {
			const state = notesReducer(
				initialState,
				setError('Something went wrong'),
			);
			expect(state.error).toBe('Something went wrong');
		});

		it('should clear error with null', () => {
			const errorState = { ...initialState, error: 'Previous error' };
			const state = notesReducer(errorState, setError(null));
			expect(state.error).toBeNull();
		});
	});

	describe('setSearchQuery', () => {
		it('should set search query', () => {
			const state = notesReducer(initialState, setSearchQuery('test'));
			expect(state.searchQuery).toBe('test');
		});

		it('should update existing search query', () => {
			const stateWithQuery = { ...initialState, searchQuery: 'old' };
			const state = notesReducer(stateWithQuery, setSearchQuery('new'));
			expect(state.searchQuery).toBe('new');
		});
	});

	describe('clearNotes', () => {
		it('should clear all notes and error', () => {
			const stateWithData = {
				...initialState,
				notes: [mockNote, mockNote2],
				error: 'Some error',
			};
			const state = notesReducer(stateWithData, clearNotes());
			expect(state.notes).toEqual([]);
			expect(state.error).toBeNull();
		});
	});
});
