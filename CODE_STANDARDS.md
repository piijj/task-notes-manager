# Code Standards Alignment

## Updates Made to Match Codebase Standards

### ✅ Fixed Issues

1. **Biome instead of ESLint**
   - Added `biome.json` with your exact configuration
   - Updated package.json scripts to use `biome check` and `biome lint`
   - Removed ESLint config

2. **Selectors using createSelector**
   - Updated `selectNotesByTaskId` to use `createSelector` from Redux Toolkit
   - Updated `selectFilteredNotes` to use `createSelector` for memoization
   - Matches your pattern in `assetSelectors.ts`

3. **Code Style**
   - Uses tabs (configured in biome.json)
   - Uses single quotes (configured in biome.json)
   - Named exports for actions (already correct)
   - `export default function` for components (already correct)
   - `'use client'` directive (already correct)

### ✅ Already Matching

1. **Redux Patterns**
   - ✅ Uses `createSlice` from Redux Toolkit
   - ✅ Typed hooks with `.withTypes<>()`
   - ✅ Immutable state updates
   - ✅ Proper action creators

2. **TypeScript**
   - ✅ Strict typing
   - ✅ No `any` types
   - ✅ Proper interfaces
   - ✅ Type inference from Zod

3. **Component Patterns**
   - ✅ Functional components with hooks
   - ✅ `'use client'` directive
   - ✅ Proper prop typing

4. **API Routes**
   - ✅ Next.js App Router pattern
   - ✅ Zod validation
   - ✅ Proper error handling

### ⚠️ Differences (Acceptable for Exam)

1. **EntityAdapter Pattern**
   - Your codebase uses `EntityAdapter` for normalized state
   - Exam uses simple array (simpler for 1-hour exam)
   - This is acceptable as it's still immutable and follows Redux patterns

2. **RTK Query**
   - Your codebase uses RTK Query extensively
   - Exam uses simple fetch calls (simpler for exam context)
   - Still demonstrates API integration skills

3. **Complex Selectors**
   - Your codebase has very complex selectors with multiple dependencies
   - Exam selectors are simpler but still use `createSelector`
   - Demonstrates the pattern correctly

## Running Biome

After installing dependencies, format and check code:

```bash
npm run check  # Format and check
npm run lint   # Lint only
```

This will ensure code matches your codebase standards.
