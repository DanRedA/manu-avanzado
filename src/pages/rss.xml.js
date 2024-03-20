import rss from '@astrojs/rss';

import { getCollection } from 'astro:content';

export async function GET(context) {
   const posts = await getCollection("blog");

   return rss({
      // `<title>` field in output xml
      title: 'Blog de Astro Blog',
      // `<description>` field in output xml
      description: 'Un ejemplo de blog estático con Astro',
      // Pull in your project "site" from the endpoint context
      // https://docs.astro.build/en/reference/api-reference/#contextsite
      site: context.site,
      // Array of `<item>`s in output xml
      // See "Generating items" section for examples using content collections and glob imports
      items: posts.map(post => ({
         ...post.data,
         link: `/blog/${post.slug}`,
      })),
      // (optional) inject custom xml
      // customData: `<language>en-us</language>`,
   });
}