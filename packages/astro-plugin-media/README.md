# astro-plugin-media

A media plugin for Astro - supports APlayer, DPlayer, ArtPlayer, Bilibili, Xigua and more.

This is an Astro integration that wraps the `remark-media` plugin.

## Installation

```bash
npm install astro-plugin-media remark-directive
# or
pnpm add astro-plugin-media remark-directive
# or
yarn add astro-plugin-media remark-directive
```

## Usage

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import astroMedia from 'astro-plugin-media';

export default defineConfig({
  integrations: [
    astroMedia({
      config: {
        // your config here
      }
    })
  ]
});
```

## Documentation

See the main [documentation](https://github.com/moecasts/remark-media) for more details.

## License

MIT
