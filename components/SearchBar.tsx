'use client';

import { memo, useCallback } from 'react';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	return (
		<div className="mb-6">
			<input
				type="text"
				value={value}
				onChange={handleChange}
				placeholder="Search notes..."
				className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}

export default memo(SearchBar);
