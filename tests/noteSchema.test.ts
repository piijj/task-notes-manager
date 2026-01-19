import { describe, it, expect } from 'vitest';
import { createNoteSchema, deleteNoteSchema } from '@/schemas/noteSchema';

describe('noteSchema', () => {
  describe('createNoteSchema', () => {
    it('should validate correct note data', () => {
      const validData = {
        text: 'This is a valid note with enough characters',
        taskId: 'task-1',
      };
      const result = createNoteSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject text shorter than 3 characters', () => {
      const invalidData = {
        text: 'ab',
        taskId: 'task-1',
      };
      const result = createNoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 3 characters');
      }
    });

    it('should reject text longer than 500 characters', () => {
      const invalidData = {
        text: 'a'.repeat(501),
        taskId: 'task-1',
      };
      const result = createNoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at most 500 characters');
      }
    });

    it('should reject empty taskId', () => {
      const invalidData = {
        text: 'Valid note text',
        taskId: '',
      };
      const result = createNoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing taskId', () => {
      const invalidData = {
        text: 'Valid note text',
      };
      const result = createNoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('deleteNoteSchema', () => {
    it('should validate correct delete data', () => {
      const validData = {
        id: 'note-1',
      };
      const result = deleteNoteSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject empty id', () => {
      const invalidData = {
        id: '',
      };
      const result = deleteNoteSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
