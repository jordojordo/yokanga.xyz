import type { Component } from 'vue';

export interface RouteMetadata {
  title:       string;
  description: string;
}

export interface Route {
  [key: string]: RouteMetadata;
}

export interface RoutesMeta {
  routes: Route;
}

export interface MetaTag {
  name:    string;
  content: string;
}

export interface RouteMeta {
  title:     string;
  metaTags?: MetaTag[];
}

export interface RouteRecordRawWithMeta {
  path:      string;
  name:      string;
  component: Component;
  meta?:     RouteMeta;
}
