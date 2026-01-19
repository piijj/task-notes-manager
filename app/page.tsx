'use client';

import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import NoteForm from '@/components/NoteForm';
import NotesList from '@/components/NotesList';
import SearchBar from '@/components/SearchBar';
import { useAppDispatch } from '@/store/hooks';
import { setError, setLoading, setNotes } from '@/store/slices/notesSlice';
import { useCallback, useEffect, useState } from 'react';

// Default task ID for the exam
const DEFAULT_TASK_ID = 'task-1';

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useAppDispatch();

	const handleSearchChange = useCallback((value: string) => {
		setSearchQuery(value);
	}, []);

	useEffect(() => {
		const fetchNotes = async () => {
			dispatch(setLoading(true));
			dispatch(setError(null));

			try {
				const response = await fetch(`/api/tasks/${DEFAULT_TASK_ID}/notes`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Failed to fetch notes');
				}

				dispatch(setNotes(data.notes || []));
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Failed to fetch notes';
				dispatch(setError(errorMessage));
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchNotes();
	}, [dispatch]);

	return (
		<main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Task Notes</h1>

				<ErrorDisplay />
				<LoadingSpinner />

				<div className="bg-white rounded-lg shadow-md p-6">
					<SearchBar value={searchQuery} onChange={handleSearchChange} />
					<NoteForm taskId={DEFAULT_TASK_ID} />
					<NotesList taskId={DEFAULT_TASK_ID} searchQuery={searchQuery} />
				</div>
			</div>
		</main>
	);
}
