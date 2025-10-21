# remark-media

一个用于媒体嵌入的 remark 插件 - 支持 APlayer, DPlayer, ArtPlayer, Bilibili, 西瓜视频等。

## 安装

```bash
npm install remark-media remark-directive
# or
pnpm add remark-media remark-directive
# or
yarn add remark-media remark-directive
```

## 使用

```js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import { remarkMedia } from 'remark-media';

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkMedia, {
    // 在这里配置
  });
```

## 配置

关于配置选项，请查看主 [astro-plugin-media 文档](https://github.com/moecasts/remark-media)。

## 许可证

MIT
