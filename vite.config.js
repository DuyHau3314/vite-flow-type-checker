import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import vitePluginBabel from 'vite-plugin-babel';

export default defineConfig({
	root: '.', // The root directory of your project
	publicDir: 'public', // The directory containing your index.html file and other static assets
	plugins: [
		reactPlugin(),
		vitePluginBabel({ include: [/\.js$/, /\.jsx$/] }),
	],
	build: {
		outDir: 'build',
	},
	esbuild: {
		loader: 'jsx',
		include: /\.js$/,
	},
	server: {
		// Force Vite to serve the index.html file for any unmatched requests
		historyApiFallback: {
			rewrites: [{ from: /^\/.*$/, to: '/index.html' }],
		},
	},
});
