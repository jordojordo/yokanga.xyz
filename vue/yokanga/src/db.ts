import Dexie from 'dexie';

interface ImageEntry {
  url: string;
  blob: Blob;
}

class ImageDatabase extends Dexie {
  images!: Dexie.Table<ImageEntry, string>;

  constructor() {
    super('ImageDatabase');
    this.version(1).stores({
      images: 'url'  // Only need to specify the primary key here
    });
  }
}

const db = new ImageDatabase();

export const saveImage = async (url: string, blob: Blob): Promise<void> => {
  await db.images.put({ url, blob });
};

export const getImage = async (url: string): Promise<Blob | undefined> => {
  const entry = await db.images.get(url);
  return entry?.blob;
};

export default db;
