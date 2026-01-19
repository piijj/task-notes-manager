import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/slices/notesSlice';
import { selectSearchQuery } from '../store/selectors/notesSelectors';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  return (
    <div className="mb-6">
      <label htmlFor="search" className="sr-only">
        Search notes
      </label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search notes..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
