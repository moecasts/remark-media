import type { Root } from 'mdast';
import type { ContainerDirective, LeafDirective, TextDirective } from 'mdast-util-directive';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { mergeConfig } from './config';
import type { PluginConfig } from './types';
import { randomString } from './utils';

type DirectiveNode = ContainerDirective | LeafDirective | TextDirective;

interface HtmlNode {
  type: 'html';
  value: string;
}

export const remarkMedia: Plugin<[PluginConfig?], Root> = (userConfig = {}) => {
  const config = mergeConfig(userConfig);
  
  return (tree) => {
    const mediaData: {
      css: Set<string>;
      js: Set<string>;
      aplayerData: unknown[];
      metingData: unknown[];
      artPlayerData: unknown[];
      dplayerData: unknown[];
    } = {
      css: new Set(),
      js: new Set(),
      aplayerData: [],
      metingData: [],
      artPlayerData: [],
      dplayerData: [],
    };

    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const directiveNode = node as DirectiveNode;
        const name = directiveNode.name?.toLowerCase();

        if (!name) return;

        const attrs = (directiveNode.attributes || {}) as Record<string, string>;
        const mediaId = randomString(16, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM');
        const tagId = `media-${mediaId}`;

        switch (name) {
          case 'aplayer':
            handleAplayer(directiveNode, attrs, tagId, mediaId, mediaData, config);
            break;
          case 'meting':
            handleMeting(directiveNode, attrs, tagId, mediaId, mediaData, config);
            break;
          case 'dplayer':
            handleDplayer(directiveNode, attrs, tagId, mediaId, mediaData, config);
            break;
          case 'artplayer':
            handleArtplayer(directiveNode, attrs, tagId, mediaId, mediaData, config);
            break;
          case 'bilibili':
            handleBilibili(directiveNode, attrs, tagId, config);
            break;
          case 'xigua':
            handleXigua(directiveNode, attrs, tagId, config);
            break;
          case 'audio':
            handleAudio(directiveNode, attrs, tagId, config);
            break;
          case 'video':
            handleVideo(directiveNode, attrs, tagId, config);
            break;
        }
      }
    });

    // Inject script at the end of the document
    if (
      mediaData.css.size > 0 ||
      mediaData.js.size > 0 ||
      mediaData.aplayerData.length > 0 ||
      mediaData.metingData.length > 0 ||
      mediaData.artPlayerData.length > 0 ||
      mediaData.dplayerData.length > 0
    ) {
      const scriptNode: HtmlNode = {
        type: 'html',
        value: generateLoaderScript(mediaData),
      };
      tree.children.push(scriptNode as never);
    }
  };
};

function handleAplayer(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  _mediaId: string,
  mediaData: {
    css: Set<string>;
    js: Set<string>;
    aplayerData: unknown[];
  },
  config: PluginConfig
) {
  const aplayerConfig = config.aplayer;
  if (!aplayerConfig) return;

  mediaData.css.add(aplayerConfig.css);
  mediaData.js.add(aplayerConfig.js);

  const audio = {
    name: attrs.name || '',
    artist: attrs.artist,
    url: attrs.url || '',
    cover: attrs.cover,
    lrc: attrs.lrc,
    theme: attrs.theme,
    type: attrs.type,
  };

  const options = {
    ...aplayerConfig.default,
    container: `#${tagId}`,
    audio: [audio],
    autoplay: attrs.autoplay === 'true',
    loop: attrs.loop,
    order: attrs.order,
    volume: attrs.volume ? Number(attrs.volume) : undefined,
    listMaxHeight: attrs.listMaxHeight,
  };

  mediaData.aplayerData.push(options);

  node.data = {
    hName: 'div',
    hProperties: {
      id: tagId,
      class: 'media-aplayer',
    },
  };
}

function handleMeting(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  _mediaId: string,
  mediaData: {
    css: Set<string>;
    js: Set<string>;
    metingData: unknown[];
  },
  config: PluginConfig
) {
  const metingConfig = config.meting;
  if (!metingConfig) return;

  const aplayerConfig = config.aplayer;
  if (aplayerConfig) {
    mediaData.css.add(aplayerConfig.css);
  }
  mediaData.js.add(metingConfig.js);

  const metingData = {
    id: tagId,
    data: {
      ...metingConfig.default,
      ...attrs,
    },
  };

  mediaData.metingData.push(metingData);

  node.data = {
    hName: 'div',
    hProperties: {
      id: tagId,
      class: 'media-meting',
    },
  };
}

function handleDplayer(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  _mediaId: string,
  mediaData: {
    js: Set<string>;
    dplayerData: unknown[];
  },
  config: PluginConfig
) {
  const dplayerConfig = config.dplayer;
  if (!dplayerConfig) return;

  mediaData.js.add(dplayerConfig.js);

  const options = {
    ...dplayerConfig.default,
    container: `#${tagId}`,
    video: {
      url: attrs.url || '',
      pic: attrs.pic,
      type: attrs.type,
    },
    autoplay: attrs.autoplay === 'true',
    loop: attrs.loop === 'true',
    screenshot: attrs.screenshot === 'true',
  };

  mediaData.dplayerData.push(options);

  node.data = {
    hName: 'div',
    hProperties: {
      id: tagId,
      class: 'media-dplayer',
    },
  };
}

function handleArtplayer(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  _mediaId: string,
  mediaData: {
    js: Set<string>;
    artPlayerData: unknown[];
  },
  config: PluginConfig
) {
  const artplayerConfig = config.artplayer;
  if (!artplayerConfig) return;

  mediaData.js.add(artplayerConfig.js);

  const options = {
    ...artplayerConfig.default,
    container: `#${tagId}`,
    url: attrs.url || '',
    title: attrs.title,
    poster: attrs.poster,
    type: attrs.type,
    autoplay: attrs.autoplay === 'true',
    loop: attrs.loop === 'true',
  };

  mediaData.artPlayerData.push(options);

  node.data = {
    hName: 'div',
    hProperties: {
      id: tagId,
      class: 'media-artplayer',
    },
  };
}

function handleBilibili(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  config: PluginConfig
) {
  const bilibiliConfig = config.bilibili?.default || {};
  const data = { ...bilibiliConfig, ...attrs };

  const bvid = data.bvid;
  const aid = data.aid;
  const page = data.page || 1;
  const danmaku = String(data.danmaku) !== 'false';
  const autoplay = String(data.autoplay) === 'true' ? 1 : 0;
  const width = data.width || '100%';
  const maxWidth = data.maxWidth || '850px';
  const margin = data.margin || 'auto';
  const allowfullscreen = data.allowfullscreen || 'allowfullscreen';
  const sandbox =
    data.sandbox || 'allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups';

  const src = `https://player.bilibili.com/player.html?${bvid ? `bvid=${bvid}` : `aid=${aid}`}&page=${page}&high_quality=1&danmaku=${danmaku ? 1 : 0}&autoplay=${autoplay}`;

  const html = `<div class="media-bilibili" style="width: ${width}; max-width: ${maxWidth}; margin: ${margin}"><iframe id="${tagId}" src="${src}" allowfullscreen="${allowfullscreen}" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="${sandbox}" style="width: 100%; aspect-ratio: 16/9;"></iframe></div>`;

  Object.assign(node, { type: 'html', value: html } as HtmlNode);
}

function handleXigua(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  config: PluginConfig
) {
  const xiguaConfig = config.xigua?.default || {};
  const data = { ...xiguaConfig, ...attrs };

  const id = (attrs.xid as string | undefined) || data.id || '';
  const autoplay = String(data.autoplay) === 'true' ? 1 : 0;
  const startTime = data.startTime || 0;
  const width = data.width || '100%';
  const maxWidth = data.maxWidth || '850px';
  const margin = data.margin || 'auto';
  const allowfullscreen = data.allowfullscreen || 'allowfullscreen';
  const sandbox =
    data.sandbox || 'allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups';

  const src = `https://www.ixigua.com/iframe/${id}?autoplay=${autoplay}&startTime=${startTime}`;

  const html = `<div class="media-xigua" style="width: ${width}; max-width: ${maxWidth}; margin: ${margin}"><iframe id="${tagId}" src="${src}" allowfullscreen="${allowfullscreen}" scrolling="no" border="0" frameborder="0" framespacing="0" sandbox="${sandbox}" style="width: 100%; aspect-ratio: 16/9;"></iframe></div>`;

  Object.assign(node, { type: 'html', value: html } as HtmlNode);
}

function handleAudio(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  config: PluginConfig
) {
  const audioConfig = config.audio?.default || {};
  const data = { ...audioConfig, ...attrs };

  const controls = data.controls !== 'false' && data.controls !== false;
  const autoplay = data.autoplay === 'true' || data.autoplay === true;
  const loop = data.loop === 'true' || data.loop === true;
  const muted = data.muted === 'true' || data.muted === true;
  const src = data.src || '';

  const html = `<audio id="${tagId}" class="media-audio" src="${src}"${controls ? ' controls' : ''}${autoplay ? ' autoplay' : ''}${loop ? ' loop' : ''}${muted ? ' muted' : ''}></audio>`;

  Object.assign(node, { type: 'html', value: html } as HtmlNode);
}

function handleVideo(
  node: DirectiveNode,
  attrs: Record<string, string>,
  tagId: string,
  config: PluginConfig
) {
  const videoConfig = config.video?.default || {};
  const data = { ...videoConfig, ...attrs };

  const controls = data.controls !== 'false' && data.controls !== false;
  const autoplay = data.autoplay === 'true' || data.autoplay === true;
  const loop = data.loop === 'true' || data.loop === true;
  const muted = data.muted === 'true' || data.muted === true;
  const src = data.src || '';
  const width = data.width || '100%';
  const height = data.height || 'auto';

  const html = `<video id="${tagId}" class="media-video" src="${src}" width="${width}" height="${height}"${controls ? ' controls' : ''}${autoplay ? ' autoplay' : ''}${loop ? ' loop' : ''}${muted ? ' muted' : ''}></video>`;

  Object.assign(node, { type: 'html', value: html } as HtmlNode);
}

function generateLoaderScript(mediaData: {
  css: Set<string>;
  js: Set<string>;
  aplayerData: unknown[];
  metingData: unknown[];
  artPlayerData: unknown[];
  dplayerData: unknown[];
}): string {
  const data = {
    css: Array.from(mediaData.css),
    js: Array.from(mediaData.js),
    aplayerData: mediaData.aplayerData,
    metingData: mediaData.metingData,
    artPlayerData: mediaData.artPlayerData,
    dplayerData: mediaData.dplayerData,
  };

  return `
<script>
(function() {
  const MMEDIA_DATA = ${JSON.stringify(data)};

  function unique(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
  }

  function loadCss(url) {
    return new Promise((resolve, reject) => {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject();
      head.appendChild(link);
    });
  }

  function loadJs(url) {
    return new Promise((resolve, reject) => {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      head.appendChild(script);
    });
  }

  function loadCssAndJs(css, js) {
    const promises = [];

    if (css && css.length > 0) {
      unique(css).forEach(c => promises.push(loadCss(c)));
    }

    if (js && js.length > 0) {
      unique(js).forEach(j => promises.push(loadJs(j)));
    }

    return Promise.all(promises);
  }

  function initPlayer(playerData) {
    const { aplayerData, metingData, artPlayerData, dplayerData } = playerData;

    if (aplayerData && aplayerData.length > 0) {
      aplayerData.forEach(config => {
        if (typeof config.container === 'string') {
          config.container = document.querySelector(config.container);
        }
        new APlayer(config);
      });
    }

    if (artPlayerData && artPlayerData.length > 0) {
      artPlayerData.forEach(config => {
        if (typeof config.container === 'string') {
          config.container = document.querySelector(config.container);
        }
        new Artplayer(config);
      });
    }

    if (dplayerData && dplayerData.length > 0) {
      dplayerData.forEach(config => {
        if (typeof config.container === 'string') {
          config.container = document.querySelector(config.container);
        }
        new DPlayer(config);
      });
    }

    if (metingData && metingData.length > 0) {
      metingData.forEach(item => {
        const container = document.getElementById(item.id);
        if (container) {
          const metingJs = document.createElement('meting-js');
          for (const key in item.data) {
            metingJs.setAttribute(key, item.data[key]);
          }
          container.appendChild(metingJs);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadCssAndJs(MMEDIA_DATA.css, MMEDIA_DATA.js).then(() => initPlayer(MMEDIA_DATA));
    });
  } else {
    loadCssAndJs(MMEDIA_DATA.css, MMEDIA_DATA.js).then(() => initPlayer(MMEDIA_DATA));
  }
})();
</script>
`;
}
