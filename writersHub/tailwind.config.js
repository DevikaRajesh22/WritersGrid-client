import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
     
    },
  },
  plugins: [
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
