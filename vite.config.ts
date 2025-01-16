import { defineConfig, loadEnv } from 'vite';
import vituum from 'vituum';
import twig from '@vituum/vite-plugin-twig';
import path from 'node:path';
import IconSpritePlugin from './plugins/vite-plugin-icon-sprite';
import { getFileName, twigJSParams } from './app';
import twigToJS from 'vite-plugin-twig-drupal';
import tailwindcss from '@vituum/vite-plugin-tailwindcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vituum({
        pages: {
          dir: './src/views',
        },
        imports: {
          paths: [],
        },
      }),
      twig({
        root: './src',
        reload: true,
        useSeparateData: true,
        ...twigJSParams,
      }),
      IconSpritePlugin(),
      twigToJS({
        ...twigJSParams,
      }),
      tailwindcss(),
    ],
    publicDir: 'static',
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': `http://localhost:${env.VITE_PORT ?? 3065}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        '@': path.resolve(process.cwd(), 'src', 'views'),
      },
    },
    build: {
      manifest: false,
      assetsInlineLimit: 0,
      modulePreload: false,
      rollupOptions: {
        input: [
          './src/views/*.twig',
          '!./src/views/__index.twig',
        ],
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].chunk.js',
          assetFileNames: getFileName,
        },
        jsx: 'react-jsx',
      },
    },
  }
});
