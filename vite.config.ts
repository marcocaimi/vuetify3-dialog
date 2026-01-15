import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vuetify3Dialog',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vuetify/components'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    outDir: 'lib',
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      BottomSheet: resolve(__dirname, 'src/BottomSheet.ts'),
      Dialog: resolve(__dirname, 'src/Dialog.ts'),
      install: resolve(__dirname, 'src/install.ts'),
      Notification: resolve(__dirname, 'src/Notification.ts'),
      Notifier: resolve(__dirname, 'src/Notifier.ts'),
      PluginContext: resolve(__dirname, 'src/PluginContext.ts'),
      Snackbar: resolve(__dirname, 'src/Snackbar.ts'),
      SnackbarContext: resolve(__dirname, 'src/SnackbarContext.ts'),
      SnackbarQueued: resolve(__dirname, 'src/SnackbarQueued.ts'),
      types: resolve(__dirname, 'src/types.ts'),
    },
  },
});
