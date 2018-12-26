import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: {
			name: 'figma-plugin-boilterplate',
			file: 'dist/figma-plugin-boilerplate.js',
			format: 'umd'
		},
		plugins: [
			resolve(),
      babel({runtimeHelpers: true,}),
      cjs(),
      production && uglify() // minify, but only in production
    ],
	},
];