import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
 {
   input: 'src/tables.ts',
   output: [
     {
       file: 'dist/index.js',
       format: 'esm',
     },
   ],
   plugins: [typescript()],
 },
 {
   input: 'dist/build/compiled/tables.d.ts',
   output: [{ file: 'dist/index.d.ts', format: 'es' }],
   plugins: [dts()],
 },
];
