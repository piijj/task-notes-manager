import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '@/components/NoteForm';
import { renderWithProviders } from '../testUtils';
import type { Note } from '@/types/note';

// Mock fetch
global.fetch = vi.fn();

describe('NoteForm', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render form with textarea and submit button', () => {
		renderWithProviders(<NoteForm taskId="task-1" />);

		expect(screen.getByLabelText(/add new note/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /add note/i })).toBeInTheDocument();
	});

	it('should update textarea value when user types', async () => {
		const user = userEvent.setup();
		renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test note');

		expect(textarea).toHaveValue('Test note');
	});

	it('should show character count', async () => {
		const user = userEvent.setup();
		renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test');

		expect(screen.getByText(/4\/500 characters/i)).toBeInTheDocument();
	});

	it('should disable submit button when text is too short', () => {
		renderWithProviders(<NoteForm taskId="task-1" />);

		const submitButton = screen.getByRole('button', { name: /add note/i });
		expect(submitButton).toBeDisabled();
	});

	it('should enable submit button when text is valid', async () => {
		const user = userEvent.setup();
		renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Valid note text');

		const submitButton = screen.getByRole('button', { name: /add note/i });
		expect(submitButton).not.toBeDisabled();
	});

	it('should create note on successful submit', async () => {
		const user = userEvent.setup();
		const mockNote: Note = {
			id: 'note-1',
			text: 'Test note',
			taskId: 'task-1',
			createdAt: Date.now(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ note: mockNote }),
		} as Response);

		const { store } = renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test note');
		await user.click(screen.getByRole('button', { name: /add note/i }));

		await waitFor(() => {
			const state = store.getState();
			expect(state.notes.notes).toHaveLength(1);
			expect(state.notes.notes[0]).toEqual(mockNote);
		});

		expect(fetch).toHaveBeenCalledWith('/api/tasks/task-1/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: 'Test note' }),
		});
	});

	it('should clear textarea after successful submit', async () => {
		const user = userEvent.setup();
		const mockNote: Note = {
			id: 'note-1',
			text: 'Test note',
			taskId: 'task-1',
			createdAt: Date.now(),
		};

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ note: mockNote }),
		} as Response);

		renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test note');
		await user.click(screen.getByRole('button', { name: /add note/i }));

		await waitFor(() => {
			expect(textarea).toHaveValue('');
		});
	});

	it('should show error message on API failure', async () => {
		const user = userEvent.setup();

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Failed to create note' }),
		} as Response);

		const { store } = renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test note');
		await user.click(screen.getByRole('button', { name: /add note/i }));

		await waitFor(() => {
			const state = store.getState();
			expect(state.notes.error).toBe('Failed to create note');
		});
	});

	it('should show loading state on button during submit', async () => {
		const user = userEvent.setup();
		const mockNote: Note = {
			id: 'note-1',
			text: 'Test note',
			taskId: 'task-1',
			createdAt: Date.now(),
		};

		let resolvePromise: (value: Response) => void;
		const promise = new Promise<Response>((resolve) => {
			resolvePromise = resolve;
		});

		vi.mocked(fetch).mockReturnValueOnce(promise);

		renderWithProviders(<NoteForm taskId="task-1" />);

		const textarea = screen.getByLabelText(/add new note/i);
		await user.type(textarea, 'Test note');
		const submitButton = screen.getByRole('button', { name: /add note/i });
		await user.click(submitButton);

		expect(screen.getByRole('button', { name: /adding/i })).toBeInTheDocument();
		expect(submitButton).toBeDisabled();

		resolvePromise!({
			ok: true,
			json: async () => ({ note: mockNote }),
		} as Response);

		await waitFor(() => {
			expect(screen.queryByRole('button', { name: /adding/i })).not.toBeInTheDocument();
		});
	});
});
