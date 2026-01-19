import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addNote, setLoading, setError } from '../store/slices/notesSlice';
import type { Note } from '../types/note';

interface NoteFormProps {
  taskId: string;
}

export default function NoteForm({ taskId }: NoteFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim() || text.trim().length < 3) {
      dispatch(setError('Note must be at least 3 characters'));
      return;
    }

    if (text.trim().length > 500) {
      dispatch(setError('Note must be at most 500 characters'));
      return;
    }

    setIsSubmitting(true);
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetch(`/api/tasks/${taskId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Empty response from server');
      }
      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create note');
      }

      dispatch(addNote(data.note as Note));
      setText('');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create note';
      dispatch(setError(errorMessage));
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="note-text"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Add New Note
        </label>
        <textarea
          id="note-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter note text..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSubmitting}
        />
        <p className="mt-1 text-sm text-gray-500">{text.length}/500 characters</p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !text.trim() || text.trim().length < 3}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
}
