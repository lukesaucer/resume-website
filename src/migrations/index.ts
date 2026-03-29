import * as migration_20260328_183502 from './20260328_183502';
import * as migration_20260329_190816_add_gallery_photos from './20260329_190816_add_gallery_photos';

export const migrations = [
  {
    up: migration_20260328_183502.up,
    down: migration_20260328_183502.down,
    name: '20260328_183502',
  },
  {
    up: migration_20260329_190816_add_gallery_photos.up,
    down: migration_20260329_190816_add_gallery_photos.down,
    name: '20260329_190816_add_gallery_photos'
  },
];
