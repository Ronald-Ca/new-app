import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	publicDir: 'public',
	build: {
		emptyOutDir: true,
		outDir: './build',
		chunkSizeWarningLimit: 1000,
		sourcemap: false,
		minify: 'terser',
		terserOptions: {
			compress: {
			  drop_console: true, 
			  drop_debugger: true, 
			},
		},
		rollupOptions: {
			maxParallelFileOps: 1,
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'], 
				},
			},
		},
	},
	server: {
		host: true,
	},
})
