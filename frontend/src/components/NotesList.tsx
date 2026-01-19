import { useAppSelector } from '../store/hooks';
import { selectFilteredNotes } from '../store/selectors/notesSelectors';
import NoteCard from './NoteCard';

interface NotesListProps {
  taskId: string;
}

export default function NotesList({ taskId }: NotesListProps) {
  const notes = useAppSelector(selectFilteredNotes);

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No notes found. Add your first note above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} taskId={taskId} />
      ))}
    </div>
  );
}
