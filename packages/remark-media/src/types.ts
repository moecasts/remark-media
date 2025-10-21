export interface MediaData {
  css?: string[];
  js?: string[];
  aplayerData?: APlayerConfig[];
  metingData?: MetingConfig[];
  artPlayerData?: ArtPlayerConfig[];
  dplayerData?: DPlayerConfig[];
}

export interface APlayerConfig {
  container: HTMLElement | string;
  audio: AudioInfo | AudioInfo[];
  fixed?: boolean;
  mini?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: 'all' | 'one' | 'none';
  order?: 'list' | 'random';
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  mutex?: boolean;
  lrcType?: number;
  listFolded?: boolean;
  listMaxHeight?: string;
  storageName?: string;
}

export interface AudioInfo {
  name: string;
  artist?: string;
  url: string;
  cover?: string;
  lrc?: string;
  theme?: string;
  type?: string;
}

export interface MetingConfig {
  id: string;
  server?: 'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu';
  type?: 'song' | 'playlist' | 'album' | 'search' | 'artist';
  auto?: string;
  fixed?: boolean;
  mini?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: 'all' | 'one' | 'none';
  order?: 'list' | 'random';
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  mutex?: boolean;
  lrcType?: number;
  listFolded?: boolean;
  listMaxHeight?: string;
  storageName?: string;
}

export interface ArtPlayerConfig {
  container: HTMLElement | string;
  url: string;
  type?: string;
  title?: string;
  poster?: string;
  volume?: number;
  isLive?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  autoSize?: boolean;
  autoMini?: boolean;
  loop?: boolean;
  flip?: boolean;
  playbackRate?: boolean;
  aspectRatio?: boolean;
  screenshot?: boolean;
  setting?: boolean;
  hotkey?: boolean;
  pip?: boolean;
  mutex?: boolean;
  fullscreen?: boolean;
  fullscreenWeb?: boolean;
  subtitleOffset?: boolean;
  miniProgressBar?: boolean;
  playsInline?: boolean;
  [key: string]: unknown;
}

export interface DPlayerConfig {
  container: HTMLElement | string;
  live?: boolean;
  autoplay?: boolean;
  theme?: string;
  loop?: boolean;
  lang?: string;
  screenshot?: boolean;
  hotkey?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  mutex?: boolean;
  video: {
    url: string;
    pic?: string;
    thumbnails?: string;
    type?: 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal';
    customType?: Record<string, unknown>;
  };
  subtitle?: {
    url: string;
    type?: 'webvtt' | 'ass';
    fontSize?: string;
    bottom?: string;
    color?: string;
  };
  danmaku?: {
    id: string;
    api: string;
    token?: string;
    maximum?: number;
    addition?: string[];
    user?: string;
    bottom?: string;
    unlimited?: boolean;
  };
  [key: string]: unknown;
}

export interface BilibiliConfig {
  bvid?: string;
  aid?: string;
  page?: number;
  danmaku?: boolean;
  autoplay?: boolean;
  allowfullscreen?: string;
  sandbox?: string;
  width?: string;
  maxWidth?: string;
  margin?: string;
}

export interface XiguaConfig {
  id: string;
  autoplay?: boolean;
  startTime?: number;
  allowfullscreen?: string;
  sandbox?: string;
  width?: string;
  maxWidth?: string;
  margin?: string;
}

export interface PluginConfig {
  aplayer?: {
    js: string;
    css: string;
    default?: Partial<APlayerConfig>;
  };
  meting?: {
    js: string;
    api?: string;
    default?: Partial<MetingConfig>;
  };
  dplayer?: {
    js: string;
    hls_js?: string;
    dash_js?: string;
    shaka_dash_js?: string;
    flv_js?: string;
    webtorrent_js?: string;
    default?: Partial<DPlayerConfig>;
  };
  artplayer?: {
    js: string;
    hls_js?: string;
    dash_js?: string;
    shaka_dash_js?: string;
    flv_js?: string;
    webtorrent_js?: string;
    default?: Partial<ArtPlayerConfig>;
  };
  bilibili?: {
    default?: Partial<BilibiliConfig>;
  };
  xigua?: {
    default?: Partial<XiguaConfig>;
  };
  audio?: {
    default?: Record<string, unknown>;
  };
  video?: {
    default?: Record<string, unknown>;
  };
}
