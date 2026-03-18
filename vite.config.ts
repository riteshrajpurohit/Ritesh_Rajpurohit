import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        headers: {
            'Cache-Control': 'public, max-age=3600'
        }
    },
    build: {
        rollupOptions: {
            output: {
                // Prevent chunking videos
                manualChunks: undefined
            }
        },
        assetsInlineLimit: 0, // Don't inline videos
        chunkSizeWarningLimit: 1000 // Increase chunk size limit
    }
});
