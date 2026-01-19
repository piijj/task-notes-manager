import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setNotes, setLoading, setError } from './store/slices/notesSlice';
import { selectError, selectLoading } from './store/selectors/notesSelectors';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import SearchBar from './components/SearchBar';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const TASK_ID = 'task-1';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(`/api/tasks/${TASK_ID}/notes`);
        const text = await response.text();
        if (!text) {
          dispatch(setError('Empty response from server'));
          return;
        }
        const data = JSON.parse(text);
        if (response.ok) {
          dispatch(setNotes(data.notes || []));
        } else {
          dispatch(setError(data.error || 'Failed to fetch notes'));
        }
      } catch {
        dispatch(setError('Failed to connect to server'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotes();
  }, [dispatch]);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Task Notes Manager
        </h1>

        <NoteForm taskId={TASK_ID} />

        <SearchBar />

        {error && <ErrorDisplay message={error} />}

        {loading ? <LoadingSpinner /> : <NotesList taskId={TASK_ID} />}
      </div>
    </main>
  );
}

export default App;
