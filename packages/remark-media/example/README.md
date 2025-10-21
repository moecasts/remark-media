# remark-media Example

这是一个展示如何在纯 remark 环境中使用 `remark-media` 插件的示例。

## 运行示例

```bash
# 安装依赖
pnpm install

# 构建示例
pnpm build

# 在浏览器中预览
pnpm preview
```

## 文件说明

- `content.md` - Markdown 源文件，包含各种媒体指令
- `build.js` - 构建脚本，使用 remark 处理 markdown
- `output.html` - 生成的 HTML 文件（运行构建后生成）

## 工作原理

这个示例展示了如何在任何 Node.js 项目中使用 `remark-media`：

1. 使用 `unified` 创建处理器
2. 添加 `remark-parse` 解析 markdown
3. 添加 `remark-directive` 支持指令语法
4. 添加 `remark-media` 处理媒体指令
5. 添加 `remark-html` 生成 HTML

这意味着你可以在任何支持 remark 的项目中使用此插件，包括：

- 静态站点生成器（Astro, Next.js, Gatsby 等）
- 文档工具（Docusaurus, VitePress 等）
- 自定义 markdown 处理器
- 任何 Node.js 应用

## 配置

你可以在 `build.js` 中自定义配置：

```javascript
.use(remarkMedia, {
  aplayer: {
    js: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
    css: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
    default: {
      theme: '#b7daff',
    },
  },
  // 更多配置...
})
```

详细配置选项请参考主 [README](../README.md)。
