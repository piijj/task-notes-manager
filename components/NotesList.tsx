'use client';

import { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectFilteredNotes } from '@/store/selectors/notesSelectors';
import type { Note } from '@/types/note';
import NoteCard from './NoteCard';

interface NotesListProps {
	taskId: string;
	searchQuery: string;
}

function NotesList({ taskId, searchQuery }: NotesListProps) {
	const notes = useAppSelector((state) =>
		selectFilteredNotes(state, searchQuery, taskId),
	);

	const emptyStateMessage = useMemo(
		() =>
			searchQuery
				? 'No notes match your search.'
				: 'No notes yet. Add your first note above.',
		[searchQuery],
	);

	if (notes.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">{emptyStateMessage}</div>
		);
	}

	return (
		<div>
			<h2 className="text-lg font-semibold text-gray-800 mb-4">
				Notes ({notes.length})
			</h2>
			<div>
				{notes.map((note: Note) => (
					<NoteCard key={note.id} note={note} taskId={taskId} />
				))}
			</div>
		</div>
	);
}

export default memo(NotesList);
