import { readFileSync, writeFileSync } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkHtml from 'remark-html';
import { remarkMedia } from 'remark-media';

// Read the markdown file
const markdown = readFileSync('./content.md', 'utf-8');

// Process the markdown
const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkMedia, {
    // 只需要配置自定义选项，CDN 链接会自动注入
    aplayer: {
      default: {
        theme: '#b7daff',
      },
    },
  })
  .use(remarkHtml, { sanitize: false });

const result = await processor.process(markdown);

// Create HTML template
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>remark-media Example</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.8rem;
      margin: 2rem 0 1rem;
      color: #34495e;
    }

    h3 {
      font-size: 1.3rem;
      margin: 1.5rem 0 0.75rem;
      color: #555;
    }

    p {
      margin-bottom: 1rem;
      color: #666;
    }

    hr {
      margin: 3rem 0;
      border: none;
      border-top: 2px solid #eee;
    }

    code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }

    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1rem 0;
    }

    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }

    .media-bilibili,
    .media-xigua {
      margin: 1.5rem 0;
    }

    .media-audio,
    .media-video {
      margin: 1.5rem 0;
      width: 100%;
      max-width: 100%;
    }

    .media-aplayer,
    .media-meting,
    .media-dplayer,
    .media-artplayer {
      margin: 1.5rem 0;
    }

    .note {
      background: #e7f3ff;
      border-left: 4px solid #2196F3;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }

    .warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    ${result.value}
  </div>
</body>
</html>`;

// Write the output
writeFileSync('./output.html', html);

console.log('✅ Build complete! Output written to output.html');
console.log('📝 Open output.html in your browser to see the result.');
