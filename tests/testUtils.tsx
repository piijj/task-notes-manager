import React, { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '@/store/slices/notesSlice';
import type { RootState } from '@/store/store';
import type { PreloadedState } from '@reduxjs/toolkit';

interface RenderWithProvidersOptions {
	preloadedState?: PreloadedState<RootState>;
	store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
	ui: ReactElement,
	{
		preloadedState = {},
		store = configureStore({
			reducer: {
				notes: notesReducer,
			},
			preloadedState,
		}),
	}: RenderWithProvidersOptions = {},
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper }) };
}
