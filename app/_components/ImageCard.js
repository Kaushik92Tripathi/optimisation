'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ImageCard({ image, onClick }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="card group transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={() => onClick(image)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image.urls.regular}
          alt={image.alt_description || 'Unsplash image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoading ? 'blur-sm' : 'blur-0'
          }`}
          onLoad={() => setIsLoading(false)}
          priority={false}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 animate-pulse">
            <svg className="w-10 h-10 text-neutral-400" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.5 12c0-4.14-3.36-7.5-7.5-7.5S4.5 7.86 4.5 12s3.36 7.5 7.5 7.5v-1.5C9.1 18 6 14.9 6 12s3.1-6 6-6 6 3.1 6 6h1.5zm-7.5 7.5v-3l3.75 3.75L12 24v-3z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-playfair font-semibold text-neutral-800 truncate">
          {image.alt_description || 'Untitled Image'}
        </h3>
        <p className="text-sm text-neutral-500 mt-1 font-nunito">
          By {image.user.name || image.user.username}
        </p>
      </div>
    </div>
  );
}