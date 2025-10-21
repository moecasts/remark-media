# astro-plugin-media Example

这是一个展示如何在 Astro 项目中使用 `astro-plugin-media` 的完整示例。

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 📁 项目结构

```
/
├── public/              # 静态资源
├── src/
│   ├── layouts/
│   │   └── Layout.astro # 基础布局
│   └── pages/
│       ├── index.astro  # 首页（Astro 组件示例）
│       └── markdown.md  # Markdown 页面示例
├── astro.config.mjs     # Astro 配置
└── package.json
```

## 🎯 功能展示

### 在 Markdown 中使用

在 `.md` 文件中直接使用媒体指令：

```markdown
# 我的文章

这是一个音频播放器：

::aplayer{name="歌曲名" artist="歌手" url="音频URL"}

这是一个视频：

::bilibili{bvid="BV1xx411c7mD"}
```

### 在 Astro 组件中使用

虽然插件主要用于 Markdown，但你也可以在 Astro 组件中手动嵌入媒体：

```astro
---
// 在 frontmatter 中可以导入类型
import type { PluginConfig } from 'astro-plugin-media';
---

<div class="media-bilibili">
  <iframe src="https://player.bilibili.com/player.html?bvid=BV1xx411c7mD"></iframe>
</div>
```

## ⚙️ 配置

在 `astro.config.mjs` 中配置插件：

```javascript
import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

export default defineConfig({
  integrations: [
    media({
      config: {
        aplayer: {
          js: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
          css: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
          default: {
            theme: '#b7daff',
          },
        },
        bilibili: {
          default: {
            danmaku: true,
            autoplay: false,
          },
        },
        // 更多配置...
      },
    }),
  ],
});
```

## 📚 支持的媒体类型

- 🎵 **APlayer** - 音频播放器
- 🎼 **MetingJS** - 音乐平台（网易云、QQ音乐等）
- 🎬 **DPlayer** - 视频播放器
- 🎥 **ArtPlayer** - 高级视频播放器
- 📺 **Bilibili** - B站视频嵌入
- 🍉 **西瓜视频** - 西瓜视频嵌入
- 🔊 **HTML5 Audio** - 原生音频
- 📹 **HTML5 Video** - 原生视频

## 📖 更多信息

- [astro-plugin-media 文档](../README.md)
- [remark-media 文档](../../remark-media/README.md)
- [Astro 官方文档](https://docs.astro.build)
