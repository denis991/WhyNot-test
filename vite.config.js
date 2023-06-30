import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    Components({
      dirs: ['./src/components'],
      dts: true
    }),
    AutoImport({
      dts: true,
      vueTemplate: true,
      dirs: [
        './src/store',
        './src/types',
        './src/router',
        './src/composables'
      ],
      imports: [
        'vue',
        '@vueuse/core',
        'vue-router'
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/_var.scss"; @import "@/assets/styles/_mixins.scss";`
      }
    }
  }
});
