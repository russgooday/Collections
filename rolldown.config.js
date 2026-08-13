import { defineConfig } from 'rolldown';

export default defineConfig({
    input: 'src/collections.js',
    output: [
        {
            file: 'dist/collections.js',
            format: 'esm'
        },
        {
            file: 'dist/collections.cjs',
            format: 'cjs'
        }
    ]
});