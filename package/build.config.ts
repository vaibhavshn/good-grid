import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	entries: [
		{
			builder: 'mkdist',
			input: 'src/',
			outDir: 'dist/',
			format: 'esm',
			declaration: true,
		},
		{
			builder: 'mkdist',
			input: 'src/',
			outDir: 'dist/',
			format: 'cjs',
			declaration: true,
		},
	],

	declaration: true,
})
