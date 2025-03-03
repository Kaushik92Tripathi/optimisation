import { createApi } from 'unsplash-js';

// Initialize the Unsplash API with a public access key
// In production, you should use environment variables
const unsplash = createApi({
  accessKey: 'your-unsplash-access-key', // Replace with your access key or use process.env.UNSPLASH_ACCESS_KEY
});

// Tag for revalidation
export const IMAGES_CACHE_TAG = 'images';

export async function getRandomImages(count = 12, options = { cache: 'force-cache' }) {
  try {
    const result = await unsplash.photos.getRandom({
      count,
      ...options,
    });
    
    if (result.errors) {
      console.error('Error fetching images from Unsplash:', result.errors[0]);
      return [];
    }
    
    return result.response;
  } catch (error) {
    console.error('Error fetching images:', error);
    // Return fallback data if the API fails
    return Array(count).fill().map((_, index) => ({
      id: `fallback-${index}`,
      urls: {
        regular: `https://via.placeholder.com/800x600?text=Image+${index + 1}`,
        thumb: `https://via.placeholder.com/200x150?text=Image+${index + 1}`,
      },
      alt_description: `Fallback image ${index + 1}`,
      user: {
        name: 'Placeholder',
        username: 'placeholder',
      },
    }));
  }
}