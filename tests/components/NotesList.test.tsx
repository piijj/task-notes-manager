import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotesList from '@/components/NotesList';
import { renderWithProviders } from '../testUtils';
import type { Note } from '@/types/note';

describe('NotesList', () => {
	const mockNotes: Note[] = [
		{
			id: 'note-1',
			text: 'First note',
			taskId: 'task-1',
			createdAt: Date.now(),
		},
		{
			id: 'note-2',
			text: 'Second note',
			taskId: 'task-1',
			createdAt: Date.now(),
		},
		{
			id: 'note-3',
			text: 'Third note for task 2',
			taskId: 'task-2',
			createdAt: Date.now(),
		},
	];

	it('should render empty state when no notes', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="" />, {
			preloadedState: {
				notes: {
					notes: [],
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText(/no notes yet/i)).toBeInTheDocument();
	});

	it('should render empty state with search message when searching', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="nonexistent" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText(/no notes match your search/i)).toBeInTheDocument();
	});

	it('should render notes for specific task', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText('First note')).toBeInTheDocument();
		expect(screen.getByText('Second note')).toBeInTheDocument();
		expect(screen.queryByText('Third note for task 2')).not.toBeInTheDocument();
	});

	it('should show note count in header', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText(/notes \(2\)/i)).toBeInTheDocument();
	});

	it('should filter notes by search query', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="First" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText('First note')).toBeInTheDocument();
		expect(screen.queryByText('Second note')).not.toBeInTheDocument();
		expect(screen.getByText(/notes \(1\)/i)).toBeInTheDocument();
	});

	it('should be case-insensitive when filtering', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="FIRST" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText('First note')).toBeInTheDocument();
	});

	it('should show all notes when search query is empty', () => {
		renderWithProviders(<NotesList taskId="task-1" searchQuery="" />, {
			preloadedState: {
				notes: {
					notes: mockNotes,
					loading: false,
					error: null,
				},
			},
		});

		expect(screen.getByText('First note')).toBeInTheDocument();
		expect(screen.getByText('Second note')).toBeInTheDocument();
	});
});
