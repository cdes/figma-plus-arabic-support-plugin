import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import run from 'rollup-plugin-run';
import serve from 'rollup-plugin-serve'

const production = !process.env.ROLLUP_WATCH;
const development = process.env.ROLLUP_WATCH;

// Default options
const devServerOptions = {
  verbose: true,
  contentBase: ['dist'],
  host: 'localhost',
	port: 8080,
  headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
  }
};

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
			development && run(), // when in dev mode, run the js bundle to see output
			development && serve(devServerOptions), // when in dev mode, serve js bundle
			production && uglify(), // minify, but only in production,
    ],
	},
];