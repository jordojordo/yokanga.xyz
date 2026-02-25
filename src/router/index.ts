import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import jsYaml from 'js-yaml';

import type { RoutesMeta, RouteRecordRawWithMeta, MetaTag } from '@/types/routes';

import en from '@/assets/data/en.yaml?raw';
import HomeView from '@/views/HomeView.vue';

const yaml = jsYaml.load(en) as RoutesMeta;
const routeMeta = yaml.routes;

const routes: Array<RouteRecordRaw & RouteRecordRawWithMeta> = [
  {
    path:      '/',
    name:      'home',
    component: HomeView,
    meta:      {
      title:    routeMeta.home?.title ?? '',
      metaTags: [
        {
          name:    'description',
          content: routeMeta.home?.description ?? ''
        }
      ]
    }
  },
  {
    path:      '/j',
    name:      'jerry',
    component: () => import('@/views/JerryView.vue'),
    meta:      {
      title:    routeMeta.jerry?.title ?? '',
      metaTags: [
        {
          name:    'description',
          content: routeMeta.jerry?.description ?? ''
        }
      ]
    }
  },
  {
    path:      '/b',
    name:      'based',
    component: () => import('@/views/BasedView.vue'),
    meta:      {
      title:    routeMeta.based?.title ?? '',
      metaTags: [
        {
          name:    'description',
          content: routeMeta.based?.description ?? ''
        }
      ]
    }
  },
  {
    path:      '/m',
    name:      'mystique',
    component: () => import('@/views/MystiqueView.vue'),
    meta:      {
      title:    routeMeta.mystique?.title ?? '',
      metaTags: [
        {
          name:    'description',
          content: routeMeta.mystique?.description ?? ''
        }
      ]
    }
  },
  {
    path:      '/p',
    name:      'picnic',
    component: () => import('@/views/PicnicView.vue'),
    meta:      {
      title:    routeMeta.picnic?.title ?? '',
      metaTags: [
        {
          name:    'description',
          content: routeMeta.picnic?.description ?? ''
        }
      ]
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags) as RouteRecordRawWithMeta | undefined;

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title) as RouteRecordRawWithMeta | undefined;

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta!.title as string; // The exclamation mark asserts that meta is not undefined.
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta!.title as string; // Asserting non-null.
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) =>
    el.parentNode?.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) {
    return next();
  }

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta
    .meta!.metaTags!.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key as keyof MetaTag]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
