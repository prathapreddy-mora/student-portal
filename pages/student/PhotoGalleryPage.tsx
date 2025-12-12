
import React, { useState } from 'react';

// Reordered images for a better visual flow: Exteriors -> Interiors -> Scenery
const images = [
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/2d699ac2-1138-4e8c-8422-9214d02677dd.png', alt: 'Hostel Building Exterior' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/fd5f68b3-1f19-482d-835b-1c5c0d29188e.png', alt: 'Hostel Building Night View' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/b919d80d-85fa-49d7-832f-90e43d4d762e.png', alt: 'Hostel Courtyard at Night' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/e903ab79-c5c2-482f-87d5-d142125f18c2.png', alt: 'Donors & Honors Board' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/34a6a58a-3e28-444a-97c1-741a6b47c92b.png', alt: 'Common Hall & Study Area' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/c146e290-7d0e-47f2-bd55-2e3abcc03c51.png', alt: 'Hygienic Dining Hall' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/a47781b0-9989-498c-8ac9-805f66299b6e.png', alt: 'Peaceful Lakeside Pathway' },
  { src: 'https://storage.googleapis.com/aistudio-hosting/workspace-storage/496f8c2e-4099-4c07-b2f1-5db0d662d590.png', alt: 'Scenic View of City & Lake' },
];

const PhotoGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Photo Gallery</h2>
        <p className="text-center text-brand-text-secondary mb-8">Take a tour of our facilities and environment.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="w-full h-56 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-center">
                <div className="p-4 w-full text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm drop-shadow-md">{image.alt}</p>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 transition-opacity duration-300"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl max-h-screen w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl border-2 border-white" 
            />
            <p className="text-white text-xl mt-4 font-semibold tracking-wide">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPage;
    