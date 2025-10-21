# remark-media 示例

这是一个示例，展示了如何在纯 remark 环境中使用 `remark-media` 插件。

## 运行示例

```bash
# 安装依赖项
pnpm install

# 构建示例
pnpm build

# 在浏览器中预览
pnpm preview
```

## 文件说明

- `content.md` - 包含各种媒体指令的 Markdown 源文件
- `build.js` - 使用 remark 处理 markdown 的构建脚本
- `output.html` - 生成的 HTML 文件（在运行构建后生成）

## 工作原理

此示例演示了如何在任何 Node.js 项目中使用 `remark-media`：

1. 使用 `unified` 创建处理器
2. 添加 `remark-parse` 以解析 markdown
3. 添加 `remark-directive` 以支持指令语法
4. 添加 `remark-media` 以处理媒体指令
5. 添加 `remark-html` 以生成 HTML

这意味着您可以在任何支持 remark 的项目中使用此插件，包括：

- 静态站点生成器（Astro、Next.js、Gatsby 等）
- 文档工具（Docusaurus、VitePress 等）
- 自定义 markdown 处理器
- 任何 Node.js 应用程序

## 配置

您可以在 `build.js` 中自定义配置：

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

有关详细的配置选项，请参阅主 [README](../README.md)。
