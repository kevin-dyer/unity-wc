import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/components/unity-core/index.js',
  output: [{
    file: 'bundle/unity-core-bundle.js',
    format: 'iife'
  },
  {
    file: 'bundle/unity-core-bundle.min.js',
    format: 'iife',
    name: 'version',
    plugins: [terser()]
  }
  ],
  plugins: [ resolve() ]
};