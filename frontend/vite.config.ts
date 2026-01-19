import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0',
		port: Number(process.env.PORT) || 8000,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:5001',
				changeOrigin: true,
			},
		},
	},
});
