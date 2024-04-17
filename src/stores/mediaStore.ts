import { defineStore } from 'pinia';

interface MediaState {
  lastTime: number;
  loop: boolean;
  isVisible?: boolean;
}

interface AppState {
  routes: Record<string, MediaState>;
}

export const useMediaStore = defineStore('media', {
  state: (): AppState => ({
    routes: {
      home: {
        lastTime: 0,
        loop: true,
        isVisible: false
      },
      jerry: {
        lastTime: 0,
        loop: false
      },
      based: {
        lastTime: 0,
        loop: true
      },
      mystique: {
        lastTime: 0,
        loop: false
      },
      picnic: {
        lastTime: 0,
        loop: false
      }
    }
  }),
  actions: {
    setLastTime(route: string, time: number) {
      if ( this.routes[route] ) {
        this.routes[route].lastTime = time;
      }
    },
    getConfig(route: string) {
      return this.routes[route] || null;
    },
    toggleVisibility(route: string, visible: boolean) {
      if ( this.routes[route] ) {
        this.routes[route].isVisible = visible;
      }
    }
  }
});
