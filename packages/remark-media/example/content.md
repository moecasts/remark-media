# remark-media Example

这是一个展示如何在纯 remark 环境中使用 `remark-media` 插件的示例。

## 🎵 APlayer - 音频播放器

### 单曲播放

::aplayer{name="Beautiful Song" artist="Artist Name" url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" cover="https://picsum.photos/300/300"}

### 带歌词的播放器

::aplayer{name="Song with Lyrics" artist="Singer" url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" lrc="[00:00.00]First line of lyrics\n[00:05.00]Second line of lyrics\n[00:10.00]Third line of lyrics"}

---

## 🎼 MetingJS - 音乐平台

### 网易云音乐单曲

::meting{server="netease" type="song" id="1868553"}

### 网易云音乐歌单

::meting{server="netease" type="playlist" id="2539599584" autoplay="false"}

---

## 📺 Bilibili 视频

### 标准嵌入

::bilibili{bvid="BV1xx411c7mD"}

### 自定义尺寸和配置

::bilibili{bvid="BV1xx411c7mD" page="1" danmaku="true" width="100%" maxWidth="800px"}

---

## 🎬 DPlayer - 视频播放器

### 基础视频播放

::dplayer{url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}

### 带封面的视频

::dplayer{url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" pic="https://picsum.photos/800/450"}

---

## 🎥 ArtPlayer - 高级视频播放器

### 基础播放

::artplayer{url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}

### 自定义配置

::artplayer{url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" poster="https://picsum.photos/1920/1080" autoplay="false"}

---

## 🍉 西瓜视频

::xigua{xid="7123456789012345678"}

---

## 🔊 HTML5 Audio

### 基础音频

::audio{src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"}

### 带控制的音频

::audio{src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" controls="true" loop="true"}

---

## 📹 HTML5 Video

### 基础视频

::video{src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}

### 完整配置的视频

::video{src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" controls="true" autoplay="false" loop="false" width="100%" height="auto"}

---

## 📝 使用说明

### 在你的项目中使用

```javascript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkHtml from 'remark-html';
import { remarkMedia } from 'remark-media';

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkMedia, {
    // 你的配置
    aplayer: {
      default: {
        theme: '#b7daff',
      },
    },
  })
  .use(remarkHtml, { sanitize: false });

const result = await processor.process(markdown);
```

### 语法格式

所有播放器都使用统一的指令语法：

```markdown
::播放器名称{参数1="值1" 参数2="值2"}
```

### 支持的播放器

- `aplayer` - APlayer 音频播放器
- `meting` - MetingJS 音乐平台
- `dplayer` - DPlayer 视频播放器
- `artplayer` - ArtPlayer 视频播放器
- `bilibili` - Bilibili 视频嵌入
- `xigua` - 西瓜视频嵌入
- `audio` - HTML5 音频
- `video` - HTML5 视频

---

## 🚀 运行此示例

```bash
# 安装依赖
pnpm install

# 构建示例
pnpm build

# 在浏览器中预览
pnpm preview
```

这个示例展示了如何在任何支持 remark 的项目中使用 `remark-media` 插件，不仅限于 Astro！
