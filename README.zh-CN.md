# Astro Plugin Media

一个功能强大的 Astro 媒体插件，支持在 Markdown 中嵌入多种音视频播放器。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/astro-plugin-media.svg)](https://www.npmjs.com/package/astro-plugin-media)

## ✨ 特性

- 🎵 **音频播放器** - 支持 APlayer 和原生 HTML5 audio
- 🎬 **视频播放器** - 支持 DPlayer、ArtPlayer 和原生 HTML5 video
- 🎼 **音乐服务** - 通过 MetingJS 支持网易云、QQ音乐、酷狗等平台
- 📺 **视频平台** - 支持 Bilibili、西瓜视频等平台嵌入
- ⚙️ **高度可配置** - 灵活的配置选项，支持自定义 CDN
- 🚀 **开箱即用** - 简单的指令语法，易于使用
- 📦 **Monorepo 架构** - 包含独立的 remark 插件和 Astro 集成

## 📦 包含内容

本项目采用 monorepo 架构，包含两个独立的包：

- **[remark-media](./packages/remark-media)** - 核心 remark 插件，可用于任何基于 remark 的 Markdown 处理器
- **[astro-plugin-media](./packages/astro-plugin-media)** - Astro 集成，封装了 remark-media 插件

## 🚀 快速开始

### 安装

```bash
npm install astro-plugin-media remark-directive
# 或
pnpm add astro-plugin-media remark-directive
# 或
yarn add astro-plugin-media remark-directive
```

### 配置

在 `astro.config.mjs` 中添加插件：

```js
import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

export default defineConfig({
  integrations: [media()],
});
```

### 基本使用

在 Markdown 文件中使用指令语法：

#### 音频播放器 (APlayer)

```markdown
::aplayer{name="歌曲名" artist="歌手" url="https://example.com/song.mp3" cover="https://example.com/cover.jpg"}
```

#### 音乐服务 (MetingJS)

```markdown
::meting{id="歌曲ID" server="netease" type="song"}
```

支持的服务：`netease`（网易云）、`tencent`（QQ音乐）、`kugou`（酷狗）、`xiami`（虾米）、`baidu`（百度音乐）

#### 视频播放器 (DPlayer)

```markdown
::dplayer{url="https://example.com/video.mp4" pic="https://example.com/poster.jpg"}
```

#### 视频播放器 (ArtPlayer)

```markdown
::artplayer{url="https://example.com/video.mp4" title="视频标题" poster="https://example.com/poster.jpg"}
```

#### Bilibili 视频

```markdown
::bilibili{bvid="BV1xx411c7mD"}
```

或使用 aid：

```markdown
::bilibili{aid="170001"}
```

#### 西瓜视频

```markdown
::xigua{id="视频ID"}
```

#### 原生 HTML5

```markdown
::audio{src="https://example.com/audio.mp3" controls="true"}

::video{src="https://example.com/video.mp4" controls="true"}
```

## ⚙️ 配置选项

### 自定义配置示例

```js
import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

export default defineConfig({
  integrations: [
    media({
      config: {
        // APlayer 配置
        aplayer: {
          js: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
          css: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
          default: {
            lrcType: 3,
            theme: '#b7daff',
            autoplay: false,
            loop: 'all',
            volume: 0.7,
          },
        },
        // MetingJS 配置
        meting: {
          js: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js',
          api: 'https://api.example.com/meting',
          default: {
            theme: '#b7daff',
            autoplay: false,
          },
        },
        // DPlayer 配置
        dplayer: {
          js: 'https://cdn.jsdelivr.net/npm/dplayer@1/dist/DPlayer.min.js',
          default: {
            theme: '#b7daff',
            autoplay: false,
          },
        },
        // ArtPlayer 配置
        artplayer: {
          js: 'https://cdn.jsdelivr.net/npm/artplayer@3/dist/artplayer.js',
          default: {
            autoSize: true,
            autoMini: true,
            fullscreen: true,
            fullscreenWeb: true,
          },
        },
        // Bilibili 配置
        bilibili: {
          default: {
            page: 1,
            danmaku: true,
            autoplay: false,
          },
        },
        // 西瓜视频配置
        xigua: {
          default: {
            autoplay: false,
          },
        },
        // 原生 audio 配置
        audio: {
          default: {
            controls: true,
          },
        },
        // 原生 video 配置
        video: {
          default: {
            controls: true,
          },
        },
      },
    }),
  ],
});
```

### 配置项说明

#### APlayer 配置

- `js` - APlayer JavaScript 文件 URL
- `css` - APlayer CSS 文件 URL
- `default` - 默认配置选项
  - `lrcType` - 歌词类型（0: 禁用, 1: LRC URL, 3: LRC 文本）
  - `theme` - 主题颜色
  - `autoplay` - 自动播放
  - `loop` - 循环模式（'all', 'one', 'none'）
  - `volume` - 音量（0-1）

#### MetingJS 配置

- `js` - MetingJS JavaScript 文件 URL
- `api` - Meting API 地址（可选）
- `default` - 默认配置选项
  - `server` - 音乐平台（netease, tencent, kugou, xiami, baidu）
  - `type` - 类型（song, playlist, album, search, artist）
  - `theme` - 主题颜色

#### DPlayer 配置

- `js` - DPlayer JavaScript 文件 URL
- `hls_js` - HLS.js URL（可选）
- `dash_js` - Dash.js URL（可选）
- `flv_js` - FLV.js URL（可选）
- `default` - 默认配置选项

#### ArtPlayer 配置

- `js` - ArtPlayer JavaScript 文件 URL
- `hls_js` - HLS.js URL（可选）
- `dash_js` - Dash.js URL（可选）
- `flv_js` - FLV.js URL（可选）
- `default` - 默认配置选项

#### Bilibili 配置

- `default` - 默认配置选项
  - `page` - 分P页码
  - `danmaku` - 是否显示弹幕
  - `autoplay` - 自动播放

## 🔧 开发

### 安装依赖

```bash
pnpm install
```

### 构建所有包

```bash
pnpm build
```

### 开发模式（监听文件变化）

```bash
pnpm dev
```

### 代码检查和格式化

```bash
# 检查代码
pnpm check

# 格式化代码
pnpm format

# 修复 lint 问题
pnpm lint:fix
```

### 运行示例

```bash
# 运行 Astro 示例
pnpm example:astro

# 运行 remark 示例
pnpm example:remark
```

### 清理构建产物

```bash
pnpm clean
```

## 📝 注意事项

1. **依赖要求**：确保安装了 `remark-directive` 依赖，这是使用指令语法的前提
2. **CDN 资源**：默认使用 jsDelivr CDN，生产环境建议使用自己的 CDN 地址
3. **浏览器兼容性**：某些播放器可能需要现代浏览器支持
4. **跨域问题**：音视频资源需要正确配置 CORS 头
5. **性能优化**：建议按需加载播放器资源，避免加载不使用的播放器

## 📄 许可证

[MIT](LICENSE)

## 👤 作者

moecasts

## 🔗 相关链接

- [GitHub 仓库](https://github.com/moecasts/remark-media)
- [问题反馈](https://github.com/moecasts/remark-media/issues)
- [APlayer 文档](https://aplayer.js.org/)
- [DPlayer 文档](https://dplayer.js.org/)
- [ArtPlayer 文档](https://artplayer.org/)
- [MetingJS 文档](https://github.com/metowolf/MetingJS)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📊 项目结构

```
./
├── packages/
│   ├── remark-media/          # 核心 remark 插件
│   │   ├── src/
│   │   │   ├── index.ts       # 入口文件
│   │   │   ├── remark-media.ts # 主要逻辑
│   │   │   ├── config.ts      # 默认配置
│   │   │   ├── types.ts       # 类型定义
│   │   │   └── utils.ts       # 工具函数
│   │   └── package.json
│   └── astro-plugin-media/    # Astro 集成
│       ├── src/
│       │   └── index.ts       # Astro 集成入口
│       └── package.json
├── pnpm-workspace.yaml        # pnpm workspace 配置
└── package.json               # 根 package.json
```