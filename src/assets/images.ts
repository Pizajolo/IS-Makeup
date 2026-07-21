// Importing images (rather than referencing /assets/... strings) is what lets
// Astro emit AVIF/WebP with responsive srcset at build time. Files live under
// src/ for that reason; only the favicon copy stays in public/, where it needs
// a stable unhashed path.

import behindTheScenes from './behindTheScenes.jpg';
import bride from './bride.jpg';
import eyes from './eyes.jpg';
import imageBride1 from './imageBride1.jpg';
import imageBride2 from './imageBride2.jpg';
import imageBrideLips from './imageBrideLips.jpg';
import logo from './logo.jpg';
import wedding from './wedding.jpg';

export const heroImage = imageBride1;
export const aboutImage = imageBride2;
export const logoImage = logo;

// Order matches the alt-text entries in each locale's portfolio.images, and the
// p1–p5 grid classes the stylesheet positions. Changing this order without
// changing the locale files would mismatch alt text to photos.
export const portfolioImages = [
  bride,
  eyes,
  imageBrideLips,
  wedding,
  behindTheScenes,
];
