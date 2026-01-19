import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Note } from '@/types/note';

export const selectAllNotes = (state: RootState): Note[] => state.notes.notes;

export const selectNotesByTaskId = createSelector(
	[selectAllNotes, (_state: RootState, taskId: string) => taskId],
	(notes, taskId) => notes.filter((note) => note.taskId === taskId),
);

export const selectNotesLoading = (state: RootState): boolean => state.notes.loading;

export const selectNotesError = (state: RootState): string | null => state.notes.error;

export const selectFilteredNotes = createSelector(
	[
		selectAllNotes,
		(_state: RootState, searchQuery: string, taskId: string) => taskId,
		(_state: RootState, searchQuery: string) => searchQuery,
	],
	(notes, taskId, searchQuery) => {
		// Filter by taskId first
		const taskNotes = notes.filter((note) => note.taskId === taskId);
		
		// Then filter by search query if provided
		if (!searchQuery.trim()) {
			return taskNotes;
		}
		const query = searchQuery.toLowerCase();
		return taskNotes.filter((note) => note.text.toLowerCase().includes(query));
	},
);
