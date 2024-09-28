import { ref } from 'vue';

import { saveImage, getImage } from '@/db';

export const imageLoader = () => {
  const progress = ref(0);

  // eslint-disable-next-line no-unused-vars
  const loadImages = async(urls: string[], onProgress?: (progress: number) => void): Promise<string[]> => {
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      progress.value = (loadedCount / urls.length) * 100;
      if (onProgress) {
        onProgress(progress.value);
      }
    };

    const loadImage = async(url: string): Promise<string> => {
      const cachedBlob = await getImage(url);

      if (cachedBlob) {
        updateProgress();

        return URL.createObjectURL(cachedBlob);
      }

      try {
        const response = await fetch(url);
        const blob = await response.blob();

        await saveImage(url, blob);
        updateProgress();

        return URL.createObjectURL(blob);
      } catch (e) {
        console.error(`Failed to load image ${ url }: `, e);
        throw e;
      }
    };

    const promises = urls.map(loadImage);

    return Promise.all(promises);
  };

  return {
    loadImages,
    progress
  };
};
