import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { removeNote, setLoading, setError } from '../store/slices/notesSlice';
import type { Note } from '../types/note';
import DeleteConfirmModal from './DeleteConfirmModal';

interface NoteCardProps {
  note: Note;
  taskId: string;
}

export default function NoteCard({ note, taskId }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetch(`/api/tasks/${taskId}/notes/${note.id}`, {
        method: 'DELETE',
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete note');
      }

      dispatch(removeNote(note.id));
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete note';
      dispatch(setError(errorMessage));
    } finally {
      setIsDeleting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <p className="text-gray-800 flex-1 whitespace-pre-wrap break-words">
            {note.text}
          </p>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        noteText={note.text}
      />
    </>
  );
}
