import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import run from 'rollup-plugin-run';

const production = !process.env.ROLLUP_WATCH;

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'figma-arabic-support-plugin',
			file: 'dist/figma-arabic-support-plugin.js',
			format: 'umd'
		},
		plugins: [
			resolve(),
      babel({runtimeHelpers: true,}),
      cjs(),
			production && uglify(), // minify, but only in production,
			!production && run(), // when in dev mode, run the js bundle to see output
    ],
	},
];