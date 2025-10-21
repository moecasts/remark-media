import type { AstroIntegration } from 'astro';
import remarkDirective from 'remark-directive';
import { remarkMedia } from 'remark-media';
import type { PluginConfig } from 'remark-media';

export type { PluginConfig } from 'remark-media';

export interface MediaOptions {
  config?: Partial<PluginConfig>;
}

export default function astroMedia(options: MediaOptions = {}): AstroIntegration {
  return {
    name: 'astro-plugin-media',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkDirective, [remarkMedia, options.config]],
          },
        });
      },
    },
  };
}
