import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteCard from '@/components/NoteCard';
import { renderWithProviders } from '../testUtils';
import type { Note } from '@/types/note';

// Mock fetch
global.fetch = vi.fn();

describe('NoteCard', () => {
	const mockNote: Note = {
		id: 'note-1',
		text: 'Test note content',
		taskId: 'task-1',
		createdAt: Date.now(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render note text', () => {
		renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		expect(screen.getByText('Test note content')).toBeInTheDocument();
	});

	it('should render delete button', () => {
		renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
	});

	it('should open confirmation modal when delete button is clicked', async () => {
		const user = userEvent.setup();
		renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		const deleteButton = screen.getByRole('button', { name: /^delete$/i });
		await user.click(deleteButton);

		expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText(/delete note/i)).toBeInTheDocument();
	});

	it('should close modal when cancel is clicked', async () => {
		const user = userEvent.setup();
		renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		const deleteButton = screen.getByRole('button', { name: /^delete$/i });
		await user.click(deleteButton);

		const cancelButton = screen.getByRole('button', { name: /cancel/i });
		await user.click(cancelButton);

		await waitFor(() => {
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		});
	});

	it('should delete note when confirmed', async () => {
		const user = userEvent.setup();

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
		} as Response);

		const { store } = renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />, {
			preloadedState: {
				notes: {
					notes: [mockNote],
					loading: false,
					error: null,
				},
			},
		});

		const deleteButton = screen.getByRole('button', { name: /^delete$/i });
		await user.click(deleteButton);

		const modal = screen.getByRole('dialog');
		const confirmButton = within(modal).getByRole('button', { name: /delete/i });
		await user.click(confirmButton);

		await waitFor(() => {
			const state = store.getState();
			expect(state.notes.notes).toHaveLength(0);
		});

		expect(fetch).toHaveBeenCalledWith('/api/tasks/task-1/notes/note-1', {
			method: 'DELETE',
		});
	});

	it('should show error message on delete failure', async () => {
		const user = userEvent.setup();

		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: 'Failed to delete note' }),
		} as Response);

		const { store } = renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		const deleteButton = screen.getByRole('button', { name: /^delete$/i });
		await user.click(deleteButton);

		const modal = screen.getByRole('dialog');
		const confirmButton = within(modal).getByRole('button', { name: /delete/i });
		await user.click(confirmButton);

		await waitFor(() => {
			const state = store.getState();
			expect(state.notes.error).toBe('Failed to delete note');
		});
	});

	it('should disable delete button while deleting', async () => {
		const user = userEvent.setup();

		let resolvePromise: (value: Response) => void;
		const promise = new Promise<Response>((resolve) => {
			resolvePromise = resolve;
		});

		vi.mocked(fetch).mockReturnValueOnce(promise);

		renderWithProviders(<NoteCard note={mockNote} taskId="task-1" />);

		const deleteButton = screen.getByRole('button', { name: /^delete$/i });
		await user.click(deleteButton);

		const modal = screen.getByRole('dialog');
		const confirmButton = within(modal).getByRole('button', { name: /delete/i });
		await user.click(confirmButton);

		expect(deleteButton).toBeDisabled();

		resolvePromise!({
			ok: true,
		} as Response);

		await waitFor(() => {
			expect(deleteButton).not.toBeDisabled();
		});
	});
});
