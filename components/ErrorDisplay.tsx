'use client';

import { useAppSelector } from '@/store/hooks';
import { selectNotesError } from '@/store/selectors/notesSelectors';
import { memo } from 'react';

function ErrorDisplay() {
	const error = useAppSelector(selectNotesError);

	if (!error) {
		return null;
	}

	return (
		<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
			<p className="text-red-800 text-sm">{error}</p>
		</div>
	);
}

export default memo(ErrorDisplay);
