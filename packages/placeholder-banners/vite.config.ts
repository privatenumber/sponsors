import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		vue(),
		icons(),
	],
});
