import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite';
import icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';

export default defineConfig({
	plugins: [
		vue(),
		components({
			dts: 'src/@types/unplugin-vue-components.d.ts',
			resolvers: [
				iconsResolver({
					prefix: 'icon',
				}),
			],
		}),
		icons(),
	],
});
