'use server';

import { revalidateTag } from 'next/cache';
import { IMAGES_CACHE_TAG } from './_lib/unsplash';

export async function purgeImageCache() {
  revalidateTag(IMAGES_CACHE_TAG);
  return { success: true, timestamp: new Date().toISOString() };
}