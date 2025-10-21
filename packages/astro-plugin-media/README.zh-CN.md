# astro-plugin-media

一个适用于 Astro 的媒体插件 - 支持 APlayer, DPlayer, ArtPlayer, Bilibili, 西瓜视频等。

这是一个封装了 `remark-media` 插件的 Astro 集成。

## 安装

```bash
npm install astro-plugin-media remark-directive
# or
pnpm add astro-plugin-media remark-directive
# or
yarn add astro-plugin-media remark-directive
```

## 使用

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import astroMedia from 'astro-plugin-media';

export default defineConfig({
  integrations: [
    astroMedia({
      config: {
        // 在这里配置
      }
    })
  ]
});
```

## 文档

更多详情请查看主[文档](https://github.com/moecasts/remark-media)。

## 许可证

MIT
