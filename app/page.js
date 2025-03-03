import { Suspense } from 'react';
import { getRandomImages, IMAGES_CACHE_TAG } from './_lib/unsplash';
import GalleryClient from './_components/GalleryClient';

export default async function Home() {
  // Fetch images with caching enabled using the tag for revalidation
  const images = await getRandomImages(12, { 
    cache: 'force-cache',
    next: { tags: [IMAGES_CACHE_TAG] } 
  });

  return (
    <main>
      <Suspense fallback={<div className="container-custom py-20 text-center">Loading gallery...</div>}>
        <GalleryClient initialImages={images} />
      </Suspense>
    </main>
  );
}