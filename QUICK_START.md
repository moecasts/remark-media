# 快速开始

## 安装

```bash
npm install astro-plugin-media
# 或
pnpm add astro-plugin-media
# 或
yarn add astro-plugin-media
```

## 配置

在 `astro.config.mjs` 中添加插件：

```js
import { defineConfig } from "astro/config";
import media from "astro-plugin-media";

export default defineConfig({
 integrations: [media()],
});
```

## 使用

在 Markdown 文件中使用指令语法：

### 音频播放器 (APlayer)

```markdown
::aplayer{name="歌曲名" artist="歌手" url="https://example.com/song.mp3" cover="https://example.com/cover.jpg"}
```

### 音乐服务 (MetingJS)

```markdown
::meting{id="歌曲ID" server="netease" type="song"}
```

支持的服务：`netease`、`tencent`、`kugou`、`xiami`、`baidu`

### 视频播放器 (DPlayer)

```markdown
::dplayer{url="https://example.com/video.mp4" pic="https://example.com/poster.jpg"}
```

### 视频播放器 (ArtPlayer)

```markdown
::artplayer{url="https://example.com/video.mp4" title="视频标题" poster="https://example.com/poster.jpg"}
```

### Bilibili 视频

```markdown
::bilibili{bvid="BV1xx411c7mD"}
```

或使用 aid：

```markdown
::bilibili{aid="170001"}
```

### 西瓜视频

```markdown
::xigua{id="视频ID"}
```

### 原生 HTML5

```markdown
::audio{src="https://example.com/audio.mp3" controls="true"}

::video{src="https://example.com/video.mp4" controls="true"}
```

## 自定义配置

```js
import { defineConfig } from "astro/config";
import media from "astro-plugin-media";

export default defineConfig({
 integrations: [
  media({
   config: {
    aplayer: {
     js: "https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js",
     css: "https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css",
     default: {
      lrcType: 3,
      theme: "#b7daff",
     },
    },
    bilibili: {
     default: {
      page: 1,
      danmaku: true,
      autoplay: false,
     },
    },
   },
  }),
 ],
});
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm run build

# 代码检查
pnpm run check

# 格式化代码
pnpm run format

# 修复 lint 问题
pnpm run lint:fix
```

## 注意事项

1. 确保你的 Markdown 文件支持指令语法
2. 某些播放器需要加载外部 CDN 资源
3. 建议在生产环境使用自己的 CDN 地址

## 更多信息

- [完整文档](./README.md)
- [迁移指南](./MIGRATION.md)
- [更新日志](./CHANGELOG.md)
