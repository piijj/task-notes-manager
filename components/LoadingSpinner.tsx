'use client';

import { useAppSelector } from '@/store/hooks';
import { selectNotesLoading } from '@/store/selectors/notesSelectors';
import { memo } from 'react';

function LoadingSpinner() {
	const loading = useAppSelector(selectNotesLoading);

	if (!loading) {
		return null;
	}

	return (
		<div className="flex justify-center items-center py-8">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
		</div>
	);
}

export default memo(LoadingSpinner);
