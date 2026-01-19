# Exam Instructions - Task Notes Manager

## Overview

This is a **complete working implementation** of a Task Notes Manager. For the actual exam, you will remove specific parts of the code and ask candidates to implement them.

## What's Included

### ✅ Complete Implementation

1. **Redux Store**
   - `store/store.ts` - Store configuration
   - `store/slices/notesSlice.ts` - Complete slice with all reducers
   - `store/selectors/notesSelectors.ts` - All selectors including filtered notes
   - `store/hooks.ts` - Typed hooks

2. **API Routes**
   - `app/api/tasks/[taskId]/notes/route.ts` - GET and POST endpoints
   - `app/api/tasks/[taskId]/notes/[noteId]/route.ts` - DELETE endpoint
   - All with Zod validation

3. **React Components**
   - `components/NoteForm.tsx` - Form to add notes
   - `components/NoteCard.tsx` - Individual note card with delete
   - `components/NotesList.tsx` - List of notes
   - `components/SearchBar.tsx` - Search input
   - `components/ErrorDisplay.tsx` - Error message display
   - `components/LoadingSpinner.tsx` - Loading indicator
   - `components/ReduxProvider.tsx` - Redux provider wrapper

4. **Types & Schemas**
   - `types/note.ts` - TypeScript interfaces
   - `schemas/noteSchema.ts` - Zod validation schemas

5. **Tests**
   - `tests/notesSlice.test.ts` - Redux slice tests
   - `tests/notesSelectors.test.ts` - Selector tests
   - `tests/noteSchema.test.ts` - Schema validation tests

## Suggested Areas to Remove for Exam

### Option 1: Remove Redux Implementation
**Remove:**
- Reducer logic in `store/slices/notesSlice.ts` (keep structure, remove implementation)
- Selector logic in `store/selectors/notesSelectors.ts` (keep structure, remove implementation)
- Component Redux integration (remove dispatch/select calls, keep structure)

**Candidates implement:**
- Redux slice with actions and reducers
- Selectors with filtering logic
- Component integration with Redux

### Option 2: Remove API Routes
**Remove:**
- Implementation in `app/api/tasks/[taskId]/notes/route.ts`
- Implementation in `app/api/tasks/[taskId]/notes/[noteId]/route.ts`
- Keep route files but remove logic

**Candidates implement:**
- GET endpoint to fetch notes
- POST endpoint with Zod validation
- DELETE endpoint
- Error handling

### Option 3: Remove Component Logic
**Remove:**
- Form submission logic in `NoteForm.tsx`
- Delete logic in `NoteCard.tsx`
- Search filtering in `NotesList.tsx`
- Keep component structure and UI

**Candidates implement:**
- Form handling and validation
- API calls from components
- Search/filter functionality
- Error and loading states

### Option 4: Remove Selector Logic
**Remove:**
- `selectFilteredNotes` implementation
- Keep other selectors

**Candidates implement:**
- Filter logic with case-insensitive search
- Immutable array operations

### Option 5: Remove Schema Validation
**Remove:**
- Zod schema definitions
- Validation in API routes

**Candidates implement:**
- Zod schema with proper constraints
- Validation in API endpoints
- Error handling for validation failures

## Recommended Approach

**For Easy Level Exam (1 hour):**

Remove a combination of:
1. **50% of Redux slice** - Remove reducer implementations, keep structure
2. **50% of API routes** - Remove POST endpoint implementation, keep GET
3. **Search selector** - Remove `selectFilteredNotes` implementation
4. **Component integration** - Remove Redux dispatch/select calls

This gives candidates:
- Clear structure to follow
- Multiple areas to implement
- Tests to verify their work
- Enough complexity for 1 hour

## Test Cases

All test cases are included and should pass when implementation is complete:

- ✅ Redux slice immutability
- ✅ Selector filtering
- ✅ Schema validation
- ✅ Error handling

Candidates should run `npm test` to verify their implementation.

## Running the Exam

1. Remove the selected code sections
2. Add `// TODO: Implement this` comments where code was removed
3. Provide candidates with:
   - This codebase
   - Test cases (already included)
   - Requirements document
4. Candidates implement missing functionality
5. Run tests to verify: `npm test`
6. Run app to verify: `npm run dev`

## Verification Checklist

After candidate implementation, verify:

- [ ] All tests pass: `npm test`
- [ ] App runs without errors: `npm run dev`
- [ ] Can add notes
- [ ] Can delete notes
- [ ] Search/filter works
- [ ] Error handling works
- [ ] Loading states work
- [ ] All Redux updates are immutable
- [ ] TypeScript types are correct
- [ ] No `any` types used
- [ ] Zod validation works
