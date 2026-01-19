# Task Notes Manager - Coding Exam

This is a complete implementation of a Task Notes Manager application built with Next.js, React, Redux, TypeScript, and Zod.

## Features

- ✅ Add notes to tasks
- ✅ View all notes for a task
- ✅ Delete notes
- ✅ Search/filter notes
- ✅ Real-time validation
- ✅ Error handling
- ✅ Loading states
- ✅ Immutable state management

## Tech Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Vitest** - Testing

## Getting Started

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test
# or
yarn test
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
exam-easy/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       └── [taskId]/
│   │           └── notes/
│   │               ├── route.ts          # GET, POST endpoints
│   │               └── [noteId]/
│   │                   └── route.ts      # DELETE endpoint
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── NoteForm.tsx
│   ├── NoteCard.tsx
│   ├── NotesList.tsx
│   ├── SearchBar.tsx
│   ├── ErrorDisplay.tsx
│   ├── LoadingSpinner.tsx
│   └── ReduxProvider.tsx
├── store/
│   ├── store.ts
│   ├── hooks.ts
│   ├── slices/
│   │   └── notesSlice.ts
│   └── selectors/
│       └── notesSelectors.ts
├── types/
│   └── note.ts
├── schemas/
│   └── noteSchema.ts
└── tests/
    ├── setup.ts
    ├── notesSlice.test.ts
    ├── notesSelectors.test.ts
    └── noteSchema.test.ts
```

## Key Implementation Details

### Immutable State Management

All Redux reducers use immutable updates:

```typescript
// Adding a note
state.notes = [...state.notes, action.payload];

// Removing a note
state.notes = state.notes.filter(note => note.id !== action.payload);
```

### API Validation

All API endpoints validate input using Zod schemas:

```typescript
const validationResult = createNoteSchema.safeParse(body);
if (!validationResult.success) {
  return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
}
```

### Type Safety

All components, functions, and API routes are fully typed with TypeScript.

## Test Coverage

The project includes comprehensive tests for:

- Redux slice reducers
- Selectors
- Zod schema validation
- Immutability checks

Run tests with `npm test` or `yarn test`.
