import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

// https://astro.build/config
export default defineConfig({
  integrations: [
    media({
      config: {
        aplayer: {
          default: {
            theme: '#b7daff',
          },
        },
      },
    }),
  ],
});
