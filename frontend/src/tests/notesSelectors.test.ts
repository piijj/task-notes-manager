import { describe, expect, it } from 'vitest';
import {
	selectError,
	selectFilteredNotes,
	selectFilteredNotesCount,
	selectLoading,
	selectNotes,
	selectNotesCount,
	selectSearchQuery,
} from '../store/selectors/notesSelectors';
import type { RootState } from '../store/store';
import type { Note } from '../types/note';

const mockNote1: Note = {
	id: 'note-1',
	text: 'Hello world',
	taskId: 'task-1',
	createdAt: Date.now(),
};

const mockNote2: Note = {
	id: 'note-2',
	text: 'Testing notes',
	taskId: 'task-1',
	createdAt: Date.now(),
};

const mockNote3: Note = {
	id: 'note-3',
	text: 'Another note',
	taskId: 'task-1',
	createdAt: Date.now(),
};

const createMockState = (overrides = {}): RootState => ({
	notes: {
		notes: [mockNote1, mockNote2, mockNote3],
		loading: false,
		error: null,
		searchQuery: '',
		...overrides,
	},
});

describe('notesSelectors', () => {
	describe('selectNotes', () => {
		it('should return all notes', () => {
			const state = createMockState();
			const notes = selectNotes(state);
			expect(notes).toHaveLength(3);
			expect(notes).toEqual([mockNote1, mockNote2, mockNote3]);
		});

		it('should return empty array when no notes', () => {
			const state = createMockState({ notes: [] });
			const notes = selectNotes(state);
			expect(notes).toEqual([]);
		});
	});

	describe('selectLoading', () => {
		it('should return loading state', () => {
			const state = createMockState({ loading: true });
			expect(selectLoading(state)).toBe(true);
		});

		it('should return false when not loading', () => {
			const state = createMockState({ loading: false });
			expect(selectLoading(state)).toBe(false);
		});
	});

	describe('selectError', () => {
		it('should return error message', () => {
			const state = createMockState({ error: 'Something went wrong' });
			expect(selectError(state)).toBe('Something went wrong');
		});

		it('should return null when no error', () => {
			const state = createMockState({ error: null });
			expect(selectError(state)).toBeNull();
		});
	});

	describe('selectSearchQuery', () => {
		it('should return search query', () => {
			const state = createMockState({ searchQuery: 'test' });
			expect(selectSearchQuery(state)).toBe('test');
		});
	});

	describe('selectFilteredNotes', () => {
		it('should return all notes when search query is empty', () => {
			const state = createMockState({ searchQuery: '' });
			const filtered = selectFilteredNotes(state);
			expect(filtered).toHaveLength(3);
		});

		it('should filter notes by search query (case insensitive)', () => {
			const state = createMockState({ searchQuery: 'hello' });
			const filtered = selectFilteredNotes(state);
			expect(filtered).toHaveLength(1);
			expect(filtered[0].text).toBe('Hello world');
		});

		it('should return multiple matches', () => {
			const state = createMockState({ searchQuery: 'note' });
			const filtered = selectFilteredNotes(state);
			expect(filtered).toHaveLength(2); // "Testing notes" and "Another note"
		});

		it('should return empty array when no matches', () => {
			const state = createMockState({ searchQuery: 'xyz' });
			const filtered = selectFilteredNotes(state);
			expect(filtered).toHaveLength(0);
		});

		it('should ignore whitespace-only search query', () => {
			const state = createMockState({ searchQuery: '   ' });
			const filtered = selectFilteredNotes(state);
			expect(filtered).toHaveLength(3);
		});
	});

	describe('selectNotesCount', () => {
		it('should return total count of notes', () => {
			const state = createMockState();
			expect(selectNotesCount(state)).toBe(3);
		});

		it('should return 0 for empty notes', () => {
			const state = createMockState({ notes: [] });
			expect(selectNotesCount(state)).toBe(0);
		});
	});

	describe('selectFilteredNotesCount', () => {
		it('should return count of filtered notes', () => {
			const state = createMockState({ searchQuery: 'note' });
			expect(selectFilteredNotesCount(state)).toBe(2);
		});

		it('should return total count when no filter', () => {
			const state = createMockState({ searchQuery: '' });
			expect(selectFilteredNotesCount(state)).toBe(3);
		});
	});
});
