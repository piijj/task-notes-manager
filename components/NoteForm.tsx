'use client';

import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addNote, setError } from '@/store/slices/notesSlice';
import type { Note } from '@/types/note';

interface NoteFormProps {
	taskId: string;
}

function NoteForm({ taskId }: NoteFormProps) {
	const [text, setText] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const dispatch = useAppDispatch();

	const handleTextChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setText(e.target.value);
		},
		[],
	);

		const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
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
			dispatch(setError(null));

			try {
				const response = await fetch(`/api/tasks/${taskId}/notes`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ text: text.trim() }),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Failed to create note');
				}

				// Add note to Redux store
				dispatch(addNote(data.note as Note));
				setText('');
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Failed to create note';
				dispatch(setError(errorMessage));
			} finally {
				setIsSubmitting(false);
			}
		},
		[text, taskId, dispatch],
	);

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
					onChange={handleTextChange}
					placeholder="Enter note text..."
					rows={4}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					disabled={isSubmitting}
				/>
				<p className="mt-1 text-sm text-gray-500">
					{text.length}/500 characters
				</p>
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

export default memo(NoteForm);
