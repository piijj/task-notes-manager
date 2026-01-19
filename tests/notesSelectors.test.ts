import { describe, it, expect } from 'vitest';
import { selectAllNotes, selectNotesByTaskId, selectFilteredNotes } from '@/store/selectors/notesSelectors';
import type { RootState } from '@/store/store';
import type { Note } from '@/types/note';

const mockNotes: Note[] = [
  {
    id: 'note-1',
    text: 'First note',
    taskId: 'task-1',
    createdAt: Date.now(),
  },
  {
    id: 'note-2',
    text: 'Second note',
    taskId: 'task-1',
    createdAt: Date.now(),
  },
  {
    id: 'note-3',
    text: 'Third note for task 2',
    taskId: 'task-2',
    createdAt: Date.now(),
  },
];

const mockState: RootState = {
  notes: {
    notes: mockNotes,
    loading: false,
    error: null,
  },
};

describe('notesSelectors', () => {
  it('should select all notes', () => {
    const result = selectAllNotes(mockState);
    expect(result).toEqual(mockNotes);
  });

  it('should select notes by task ID', () => {
    const result = selectNotesByTaskId(mockState, 'task-1');
    expect(result).toHaveLength(2);
    expect(result.every((note) => note.taskId === 'task-1')).toBe(true);
  });

  it('should return empty array for non-existent task ID', () => {
    const result = selectNotesByTaskId(mockState, 'task-999');
    expect(result).toEqual([]);
  });

  it('should filter notes by search query', () => {
    const result = selectFilteredNotes(mockState, 'First', 'task-1');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('First note');
  });

  it('should be case-insensitive when filtering', () => {
    const result = selectFilteredNotes(mockState, 'FIRST', 'task-1');
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('First note');
  });

  it('should return all notes when search query is empty', () => {
    const result = selectFilteredNotes(mockState, '', 'task-1');
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no notes match search', () => {
    const result = selectFilteredNotes(mockState, 'nonexistent', 'task-1');
    expect(result).toEqual([]);
  });
});
