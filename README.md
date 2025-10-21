# Astro Plugin Media

A powerful Astro media plugin that supports embedding multiple audio and video players in Markdown.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/remark-media.svg)](https://www.npmjs.com/package/remark-media)
[![npm version](https://img.shields.io/npm/v/astro-plugin-media.svg)](https://www.npmjs.com/package/astro-plugin-media)

## ✨ Features

- 🎵 **Audio Players** - Supports APlayer and native HTML5 audio
- 🎬 **Video Players** - Supports DPlayer, ArtPlayer, and native HTML5 video
- 🎼 **Music Services** - Supports NetEase, QQ Music, Kugou, and other platforms via MetingJS
- 📺 **Video Platforms** - Supports embedding from Bilibili, Xigua Video, and other platforms
- ⚙️ **Highly Configurable** - Flexible configuration options with support for custom CDNs
- 🚀 **Out-of-the-Box** - Simple directive syntax, easy to use
- 📦 **Monorepo Architecture** - Includes a standalone remark plugin and an Astro integration

## 📦 What's Included

This project uses a monorepo architecture and includes two separate packages:

- **[remark-media](./packages/remark-media)** - The core remark plugin, which can be used with any remark-based Markdown processor
- **[astro-plugin-media](./packages/astro-plugin-media)** - The Astro integration, which wraps the remark-media plugin

## 🚀 Quick Start

### Installation

```bash
npm install astro-plugin-media remark-directive
# or
pnpm add astro-plugin-media remark-directive
# or
yarn add astro-plugin-media remark-directive
```

### Configuration

Add the plugin to `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

export default defineConfig({
  integrations: [media()],
});
```

### Basic Usage

Use directive syntax in your Markdown files:

#### Audio Player (APlayer)

```markdown
::aplayer{name="Song Name" artist="Artist" url="https://example.com/song.mp3" cover="https://example.com/cover.jpg"}
```

#### Music Service (MetingJS)

```markdown
::meting{id="Song ID" server="netease" type="song"}
```

Supported services: `netease`, `tencent`, `kugou`, `xiami`, `baidu`

#### Video Player (DPlayer)

```markdown
::dplayer{url="https://example.com/video.mp4" pic="https://example.com/poster.jpg"}
```

#### Video Player (ArtPlayer)

```markdown
::artplayer{url="https://example.com/video.mp4" title="Video Title" poster="https://example.com/poster.jpg"}
```

#### Bilibili Video

```markdown
::bilibili{bvid="BV1xx411c7mD"}
```

Or using `aid`:

```markdown
::bilibili{aid="170001"}
```

#### Xigua Video

```markdown
::xigua{id="Video ID"}
```

#### Native HTML5

```markdown
::audio{src="https://example.com/audio.mp3" controls="true"}

::video{src="https://example.com/video.mp4" controls="true"}
```

## ⚙️ Configuration Options

### Custom Configuration Example

```js
import { defineConfig } from 'astro/config';
import media from 'astro-plugin-media';

export default defineConfig({
  integrations: [
    media({
      config: {
        // APlayer config
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
        // MetingJS config
        meting: {
          js: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js',
          api: 'https://api.example.com/meting',
          default: {
            theme: '#b7daff',
            autoplay: false,
          },
        },
        // DPlayer config
        dplayer: {
          js: 'https://cdn.jsdelivr.net/npm/dplayer@1/dist/DPlayer.min.js',
          default: {
            theme: '#b7daff',
            autoplay: false,
          },
        },
        // ArtPlayer config
        artplayer: {
          js: 'https://cdn.jsdelivr.net/npm/artplayer@3/dist/artplayer.js',
          default: {
            autoSize: true,
            autoMini: true,
            fullscreen: true,
            fullscreenWeb: true,
          },
        },
        // Bilibili config
        bilibili: {
          default: {
            page: 1,
            danmaku: true,
            autoplay: false,
          },
        },
        // Xigua Video config
        xigua: {
          default: {
            autoplay: false,
          },
        },
        // Native audio config
        audio: {
          default: {
            controls: true,
          },
        },
        // Native video config
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

### Configuration Details

#### APlayer Config

- `js` - APlayer JavaScript file URL
- `css` - APlayer CSS file URL
- `default` - Default configuration options
  - `lrcType` - Lyric type (0: disable, 1: LRC URL, 3: LRC text)
  - `theme` - Theme color
  - `autoplay` - Autoplay
  - `loop` - Loop mode ('all', 'one', 'none')
  - `volume` - Volume (0-1)

#### MetingJS Config

- `js` - MetingJS JavaScript file URL
- `api` - Meting API address (optional)
- `default` - Default configuration options
  - `server` - Music platform (netease, tencent, kugou, xiami, baidu)
  - `type` - Type (song, playlist, album, search, artist)
  - `theme` - Theme color

#### DPlayer Config

- `js` - DPlayer JavaScript file URL
- `hls_js` - HLS.js URL (optional)
- `dash_js` - Dash.js URL (optional)
- `flv_js` - FLV.js URL (optional)
- `default` - Default configuration options

#### ArtPlayer Config

- `js` - ArtPlayer JavaScript file URL
- `hls_js` - HLS.js URL (optional)
- `dash_js` - Dash.js URL (optional)
- `flv_js` - FLV.js URL (optional)
- `default` - Default configuration options

#### Bilibili Config

- `default` - Default configuration options
  - `page` - Page number
  - `danmaku` - Show danmaku
  - `autoplay` - Autoplay

## 🔧 Development

### Install Dependencies

```bash
pnpm install
```

### Build All Packages

```bash
pnpm build
```

### Development Mode (Watch for file changes)

```bash
pnpm dev
```

### Code Linting and Formatting

```bash
# Lint code
pnpm check

# Format code
pnpm format

# Fix lint issues
pnpm lint:fix
```

### Run Examples

```bash
# Run Astro example
pnpm example:astro

# Run remark example
pnpm example:remark
```

### Clean Build Artifacts

```bash
pnpm clean
```

## 📝 Notes

1. **Dependencies**: Ensure you have `remark-directive` installed, as it is required for the directive syntax.
2. **CDN Resources**: The default configuration uses jsDelivr CDN. It is recommended to use your own CDN for production.
3. **Browser Compatibility**: Some players may require modern browsers.
4. **CORS Issues**: Audio and video resources need to have CORS headers configured correctly.
5. **Performance Optimization**: It is recommended to load player resources on demand to avoid loading unused players.

## 📄 License

[MIT](LICENSE)

## 🔗 Related Links

- [GitHub Repository](https://github.com/moecasts/remark-media)
- [Issue Tracker](https://github.com/moecasts/remark-media/issues)
- [APlayer Docs](https://aplayer.js.org/)
- [DPlayer Docs](https://dplayer.js.org/)
- [ArtPlayer Docs](https://artplayer.org/)
- [MetingJS Docs](https://github.com/metowolf/MetingJS)

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📊 Project Structure

```
./
├── packages/
│   ├── remark-media/          # Core remark plugin
│   │   ├── src/
│   │   │   ├── index.ts       # Entry file
│   │   │   ├── remark-media.ts # Main logic
│   │   │   ├── config.ts      # Default config
│   │   │   ├── types.ts       # Type definitions
│   │   │   └── utils.ts       # Utility functions
│   │   └── package.json
│   └── astro-plugin-media/    # Astro integration
│       ├── src/
│       │   └── index.ts       # Astro integration entry
│       └── package.json
├── pnpm-workspace.yaml        # pnpm workspace config
└── package.json               # Root package.json
```
