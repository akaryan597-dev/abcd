
import React from 'react';
import type { GalleryImage } from '../types';

interface GalleryViewProps {
    galleryImages: GalleryImage[];
}

const GalleryView: React.FC<GalleryViewProps> = ({ galleryImages }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Farm &amp; Process</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">A glimpse into the journey of purity, from our pastures to your pitcher.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {galleryImages.map(image => (
          <div key={image._id} className="overflow-hidden rounded-lg break-inside-avoid group relative">
            <img 
              src={image.src} 
              alt={image.alt} 
              className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110 ${image.aspect}`}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
