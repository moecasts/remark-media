import type { PluginConfig } from './types';

export const defaultConfig: PluginConfig = {
  audio: {
    default: {
      controls: true,
    },
  },
  video: {
    default: {
      controls: true,
    },
  },
  aplayer: {
    js: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
    css: 'https://cdn.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
    default: {
      lrcType: 3,
    },
  },
  meting: {
    js: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js',
    default: {},
  },
  dplayer: {
    js: 'https://cdn.jsdelivr.net/npm/dplayer@1/dist/DPlayer.min.js',
    hls_js: 'https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js',
    dash_js: 'https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js',
    shaka_dash_js: 'https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js',
    flv_js: 'https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js',
    webtorrent_js: 'https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js',
    default: {},
  },
  artplayer: {
    js: 'https://cdn.jsdelivr.net/npm/artplayer@3/dist/artplayer.js',
    hls_js: 'https://cdn.jsdelivr.net/npm/hls.js/dist/hls.min.js',
    dash_js: 'https://cdn.jsdelivr.net/npm/dashjs/dist/dash.all.min.js',
    shaka_dash_js: 'https://cdn.jsdelivr.net/npm/shaka-player/dist/shaka-player.compiled.js',
    flv_js: 'https://cdn.jsdelivr.net/npm/flv.js/dist/flv.min.js',
    webtorrent_js: 'https://cdn.jsdelivr.net/npm/webtorrent/webtorrent.min.js',
    default: {
      autoSize: true,
      autoMini: true,
      fullscreen: true,
      fullscreenWeb: true,
    },
  },
  bilibili: {
    default: {
      page: 1,
      danmaku: true,
      autoplay: false,
      allowfullscreen: 'allowfullscreen',
      sandbox: 'allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups',
      width: '100%',
      maxWidth: '850px',
      margin: 'auto',
    },
  },
  xigua: {
    default: {
      autoplay: false,
      startTime: 0,
      allowfullscreen: 'allowfullscreen',
      sandbox: 'allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups',
      width: '100%',
      maxWidth: '850px',
      margin: 'auto',
    },
  },
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: this is a merge config function
export function mergeConfig(userConfig: Partial<PluginConfig> = {}): PluginConfig {
  return {
    audio: {
      ...defaultConfig.audio,
      ...userConfig.audio,
      default: {
        ...defaultConfig.audio?.default,
        ...userConfig.audio?.default,
      },
    },
    video: {
      ...defaultConfig.video,
      ...userConfig.video,
      default: {
        ...defaultConfig.video?.default,
        ...userConfig.video?.default,
      },
    },
    aplayer: {
      js: userConfig.aplayer?.js ?? defaultConfig.aplayer?.js ?? '',
      css: userConfig.aplayer?.css ?? defaultConfig.aplayer?.css ?? '',
      default: {
        ...defaultConfig.aplayer?.default,
        ...userConfig.aplayer?.default,
      },
    },
    meting: {
      js: userConfig.meting?.js ?? defaultConfig.meting?.js ?? '',
      api: userConfig.meting?.api ?? defaultConfig.meting?.api,
      default: {
        ...defaultConfig.meting?.default,
        ...userConfig.meting?.default,
      },
    },
    dplayer: {
      js: userConfig.dplayer?.js ?? defaultConfig.dplayer?.js ?? '',
      hls_js: userConfig.dplayer?.hls_js ?? defaultConfig.dplayer?.hls_js,
      dash_js: userConfig.dplayer?.dash_js ?? defaultConfig.dplayer?.dash_js,
      shaka_dash_js: userConfig.dplayer?.shaka_dash_js ?? defaultConfig.dplayer?.shaka_dash_js,
      flv_js: userConfig.dplayer?.flv_js ?? defaultConfig.dplayer?.flv_js,
      webtorrent_js: userConfig.dplayer?.webtorrent_js ?? defaultConfig.dplayer?.webtorrent_js,
      default: {
        ...defaultConfig.dplayer?.default,
        ...userConfig.dplayer?.default,
      },
    },
    artplayer: {
      js: userConfig.artplayer?.js ?? defaultConfig.artplayer?.js ?? '',
      hls_js: userConfig.artplayer?.hls_js ?? defaultConfig.artplayer?.hls_js,
      dash_js: userConfig.artplayer?.dash_js ?? defaultConfig.artplayer?.dash_js,
      shaka_dash_js: userConfig.artplayer?.shaka_dash_js ?? defaultConfig.artplayer?.shaka_dash_js,
      flv_js: userConfig.artplayer?.flv_js ?? defaultConfig.artplayer?.flv_js,
      webtorrent_js: userConfig.artplayer?.webtorrent_js ?? defaultConfig.artplayer?.webtorrent_js,
      default: {
        ...defaultConfig.artplayer?.default,
        ...userConfig.artplayer?.default,
      },
    },
    bilibili: {
      ...defaultConfig.bilibili,
      ...userConfig.bilibili,
      default: {
        ...defaultConfig.bilibili?.default,
        ...userConfig.bilibili?.default,
      },
    },
    xigua: {
      ...defaultConfig.xigua,
      ...userConfig.xigua,
      default: {
        ...defaultConfig.xigua?.default,
        ...userConfig.xigua?.default,
      },
    },
  };
}
