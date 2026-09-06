import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const base=process.env.PAGES_BASE_PATH || '/palette-ppt-studio/';
export default defineConfig({
 root:root+'pages',base,publicDir:root+'public',
 resolve:{alias:{'@':root}},
 plugins:[react()],
 css:{postcss:{plugins:[tailwindcss()]}},
 define:{'process.env.NEXT_PUBLIC_BASE_PATH':JSON.stringify(base)},
 build:{outDir:root+'dist-pages',emptyOutDir:true},
});
