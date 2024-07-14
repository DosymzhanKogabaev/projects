import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		server: {
			proxy: {
				'/api': {
					target: 'http://91.147.91.163:8888/', //Orignal
					// target: 'http://192.168.0.116:8000',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^/, '')
				}
			}
		},
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	};
});
