import { describe, expect, it } from 'vitest';
import {
	selectFilteredNotes,
	selectFilteredNotesCount,
	selectNotesCount,
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
			expect(filtered).toHaveLength(2);
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
