import { describe, expect, it } from 'vitest';
import { createNoteSchema, deleteNoteSchema } from '../schemas/noteSchema';

describe('noteSchema', () => {
	describe('createNoteSchema', () => {
		it('should validate a valid note', () => {
			const validNote = {
				text: 'This is a valid note',
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(validNote);
			expect(result.success).toBe(true);
		});

		it('should reject text shorter than 3 characters', () => {
			const invalidNote = {
				text: 'ab',
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(invalidNote);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					'Note must be at least 3 characters',
				);
			}
		});

		it('should reject text longer than 500 characters', () => {
			const invalidNote = {
				text: 'a'.repeat(501),
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(invalidNote);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe(
					'Note must be at most 500 characters',
				);
			}
		});

		it('should accept text with exactly 3 characters', () => {
			const validNote = {
				text: 'abc',
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(validNote);
			expect(result.success).toBe(true);
		});

		it('should accept text with exactly 500 characters', () => {
			const validNote = {
				text: 'a'.repeat(500),
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(validNote);
			expect(result.success).toBe(true);
		});

		it('should reject empty taskId', () => {
			const invalidNote = {
				text: 'Valid text',
				taskId: '',
			};
			const result = createNoteSchema.safeParse(invalidNote);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe('Task ID is required');
			}
		});

		it('should reject missing text field', () => {
			const invalidNote = {
				taskId: 'task-1',
			};
			const result = createNoteSchema.safeParse(invalidNote);
			expect(result.success).toBe(false);
		});

		it('should reject missing taskId field', () => {
			const invalidNote = {
				text: 'Valid text',
			};
			const result = createNoteSchema.safeParse(invalidNote);
			expect(result.success).toBe(false);
		});
	});

	describe('deleteNoteSchema', () => {
		it('should validate a valid note id', () => {
			const validInput = { id: 'note-123' };
			const result = deleteNoteSchema.safeParse(validInput);
			expect(result.success).toBe(true);
		});

		it('should reject empty id', () => {
			const invalidInput = { id: '' };
			const result = deleteNoteSchema.safeParse(invalidInput);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].message).toBe('Note ID is required');
			}
		});

		it('should reject missing id field', () => {
			const invalidInput = {};
			const result = deleteNoteSchema.safeParse(invalidInput);
			expect(result.success).toBe(false);
		});
	});
});
