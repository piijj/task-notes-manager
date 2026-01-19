import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectLoading = (state: RootState) => state.notes.loading;
export const selectError = (state: RootState) => state.notes.error;
export const selectSearchQuery = (state: RootState) => state.notes.searchQuery;

export const selectFilteredNotes = createSelector(
  [selectNotes, selectSearchQuery],
  (notes, searchQuery) => {
    // TODO: Implement filtering logic
    // - If searchQuery is empty or whitespace only, return all notes
    // - Otherwise, filter notes where text contains searchQuery (case-insensitive)
    // - Return the filtered array
    return [];
  }
);

export const selectNotesCount = createSelector(
  [selectNotes], 
  (notes) => {
    // TODO: Implement - return the count of notes
    return 0;
  }
);

export const selectFilteredNotesCount = createSelector(
  [selectFilteredNotes],
  (notes) => {
    // TODO: Implement - return the count of filtered notes
    return 0;
  }
);
