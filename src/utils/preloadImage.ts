export function preloadImages(
  images: string[],
  onProgress: (progress: number) => void
): Promise<void[]> {
  let loadedCount = 0;

  const updateProgress = () => {
    loadedCount++;
    onProgress((loadedCount / images.length) * 100);
  };

  const promises = images.map(
    (path) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          updateProgress();
          resolve();
        };

        img.onerror = (e) => {
          console.error(`Error preloading: ${ path }`, e);
          updateProgress();
          reject(e);
        };
        img.src = path;
      })
  );

  return Promise.all(promises);
}
