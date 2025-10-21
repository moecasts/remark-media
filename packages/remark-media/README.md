# remark-media

A remark plugin for media embeds - supports APlayer, DPlayer, ArtPlayer, Bilibili, Xigua and more.

## Installation

```bash
npm install remark-media remark-directive
# or
pnpm add remark-media remark-directive
# or
yarn add remark-media remark-directive
```

## Usage

```js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import { remarkMedia } from 'remark-media';

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkMedia, {
    // your config here
  });
```

## Configuration

See the main [astro-plugin-media documentation](https://github.com/moecasts/remark-media) for configuration options.

## License

MIT
