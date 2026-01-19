import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectLoading = (state: RootState) => state.notes.loading;
export const selectError = (state: RootState) => state.notes.error;
export const selectSearchQuery = (state: RootState) => state.notes.searchQuery;

export const selectFilteredNotes = createSelector(
  [selectNotes, selectSearchQuery],
  (notes, searchQuery) => {
    if (!searchQuery.trim()) {
      return notes;
    }
    const query = searchQuery.toLowerCase();
    return notes.filter((note) => note.text.toLowerCase().includes(query));
  }
);

export const selectNotesCount = createSelector([selectNotes], (notes) => notes.length);

export const selectFilteredNotesCount = createSelector(
  [selectFilteredNotes],
  (notes) => notes.length
);
