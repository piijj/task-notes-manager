# Task Notes Manager - Full Stack Developer Assessment

## Problem Description

You are tasked with implementing a **Task Notes Manager** feature that allows users to add, view, search, and delete notes for tasks. This is a full-stack application built with Next.js, React, Redux Toolkit, TypeScript, and Zod.

## Requirements

### 1. Note Data Structure

Each note should have the following structure:

```typescript
interface Note {
  id: string;
  text: string;
  taskId: string;
  createdAt: number; // Unix timestamp in milliseconds
}
```

### 2. API Endpoints

You need to implement the following API routes:

#### GET `/api/tasks/[taskId]/notes`
- Fetches all notes for a given task
- Returns: `{ notes: Note[] }`
- Status: `200` on success, `500` on error

#### POST `/api/tasks/[taskId]/notes`
- Creates a new note for a task
- Request body: `{ text: string }`
- Validation:
  - `text` must be a string
  - `text` must be at least 3 characters
  - `text` must be at most 500 characters
  - `taskId` is provided in the URL parameter
- Returns: `{ note: Note }` with generated `id` and `createdAt`
- Status: `201` on success, `400` on validation error, `500` on server error

#### DELETE `/api/tasks/[taskId]/notes/[noteId]`
- Deletes a note by ID
- Returns: Empty response
- Status: `200` on success, `404` if note not found, `500` on error

**Important:** All API endpoints must use Zod for request validation and return appropriate error messages.

### 3. Redux State Management

Implement a Redux slice with the following:

#### State Shape
```typescript
interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}
```

#### Actions Required
- `setNotes(notes: Note[])` - Set all notes
- `addNote(note: Note)` - Add a new note (immutably)
- `removeNote(noteId: string)` - Remove a note by ID (immutably)
- `setLoading(loading: boolean)` - Set loading state
- `setError(error: string | null)` - Set error message

**Critical:** All state updates must be **immutable**. Use spread operators and array methods like `filter`, `map` that return new arrays.

#### Selectors Required
- `selectAllNotes` - Get all notes
- `selectFilteredNotes(state, searchQuery, taskId)` - Get notes filtered by:
  - Task ID matching
  - Search query (case-insensitive text search)
  - Returns empty array if no matches

### 4. React Components

#### NoteForm Component
- Textarea for note input
- Character counter (X/500)
- Submit button (disabled when text < 3 characters or > 500 characters)
- Loading state during submission ("Adding...")
- Calls POST API endpoint
- Dispatches `addNote` action on success
- Dispatches `setError` action on failure
- Clears form on successful submission

#### NotesList Component
- Displays list of notes for a task
- Shows empty state when no notes: "No notes yet. Add your first note above."
- Shows filtered empty state: "No notes match your search."
- Displays note count in header: "Notes (X)"
- Uses `selectFilteredNotes` selector
- Renders `NoteCard` for each note

#### NoteCard Component
- Displays note text
- Delete button
- Opens confirmation modal on delete click
- Calls DELETE API endpoint
- Dispatches `removeNote` action on success
- Dispatches `setError` action on failure

#### SearchBar Component
- Input field for searching notes
- Updates search query in real-time
- Used by parent component to filter notes

### 5. Error Handling

- Display error messages in the UI
- Handle network errors
- Handle validation errors from API
- Show appropriate error messages to users
- Clear errors when new actions are performed

### 6. Loading States

- Show loading spinner during initial data fetch
- Disable buttons during API calls
- Show loading text on submit buttons ("Adding...", "Deleting...")

## Constraints

1. **Immutability**: All Redux state updates must be immutable. Never mutate arrays or objects directly.
   - ✅ Correct: `state.notes = [...state.notes, newNote]`
   - ❌ Wrong: `state.notes.push(newNote)`

2. **TypeScript**: 
   - Use proper types for all functions, props, and state
   - Avoid `any` types
   - Use interfaces for data structures

3. **Zod Validation**:
   - All API endpoints must validate input using Zod schemas
   - Return clear error messages for validation failures

4. **Search Functionality**:
   - Must be case-insensitive
   - Must filter in real-time as user types
   - Must filter by both task ID and search query

## Implementation Notes

- The project structure is already set up
- Some code may be missing and marked with `// TODO: Implement this`
- Follow the existing code patterns and conventions
- Use the provided test cases to verify your implementation

## Testing

Run the test suite to verify your implementation:

```bash
npm test
```

All tests should pass when your implementation is complete. The tests cover:
- Redux slice immutability
- Selector filtering logic
- Zod schema validation
- Component behavior

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
```

## Evaluation Criteria

Your solution will be evaluated on:

1. **Correctness** - Does the implementation work as specified?
2. **Code Quality** - Clean, readable, well-structured code
3. **TypeScript** - Proper typing, no `any` types
4. **Immutability** - All state updates are immutable
5. **Error Handling** - Comprehensive error handling
6. **Test Coverage** - All tests pass
7. **Best Practices** - Follows React and Redux best practices

## Time Limit

**1 hour**

Good luck!
