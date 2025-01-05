import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://yourdomain.com',
  
  markdown: {
    integrations: [mdx()],
    syntaxHighlight: 'shiki',  
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: true,
    }),
  ],
});