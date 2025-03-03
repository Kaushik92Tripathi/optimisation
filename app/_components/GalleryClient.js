'use client';

import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ImageCard from './ImageCard';
import { purgeImageCache } from '../actions';

// Dynamically import the Popup component with SSR disabled
const Popup = dynamic(() => import('./Popup'), { ssr: false });

export default function GalleryClient({ initialImages }) {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePurgeCache = async () => {
    startTransition(async () => {
      const result = await purgeImageCache();
      if (result.success) {
        setLastUpdated(result.timestamp);
        window.location.reload(); // Reload to see new images
      }
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#2e5077]">
              Serene Gallery
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2e5077] text-white py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Discover Beautiful Moments
            </h2>
            <p className="text-lg mb-6 opacity-90 font-nunito">
              A curated collection of inspiring photography from around the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handlePurgeCache} 
                disabled={isPending}
                className="btn bg-[#de8c3d] hover:bg-[#ca7b32] text-white font-nunito"
              >
                {isPending ? 'Refreshing Gallery...' : 'Refresh Gallery'}
              </button>
              {lastUpdated && (
                <div className="text-sm opacity-80 flex items-center font-nunito">
                  Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-2xl font-playfair font-bold mb-8 text-[#2e5077]">
            Featured Photography
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                onClick={handleImageClick} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container-custom">
          <h2 className="text-2xl font-playfair font-bold mb-8 text-[#2e5077] text-center">
            Next.js Features Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#2e5077] text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2 text-[#2e5077]">Optimized Caching</h3>
              <p className="font-nunito text-neutral-600">
                Experience efficient data fetching with Next.js caching strategies using &apos;force-cache&apos; and cache tags.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#de8c3d] text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2 text-[#2e5077]">Image Optimization</h3>
              <p className="font-nunito text-neutral-600">
                Automatic image optimization with the Next.js Image component for better performance and user experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[#2e5077] text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-2 text-[#2e5077]">Dynamic Components</h3>
              <p className="font-nunito text-neutral-600">
                Dynamically imported components like our image popup for optimized page loading and better performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e5077] text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-nunito"> {new Date().getFullYear()} Serene Gallery</p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-white opacity-80 font-nunito">
                Built with Next.js, Tailwind CSS, and Unsplash API
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup */}
      {selectedImage && (
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description || 'Image detail'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
              />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-lg text-[#2e5077]">
                {selectedImage.alt_description || 'Untitled'}
              </h3>
              <p className="text-sm text-neutral-600 mt-1 font-nunito">
                Photographer: {selectedImage.user.name}
              </p>
              {selectedImage.description && (
                <p className="mt-2 text-neutral-700 font-nunito">
                  {selectedImage.description}
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <a 
                  href="#" 
                  className="inline-block px-4 py-2 bg-[#2e5077] hover:bg-[#3a6491] text-white rounded-md font-nunito transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClosePopup();
                  }}
                >
                  Close Detail View
                </a>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}