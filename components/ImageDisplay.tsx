
import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      <h3 className="font-semibold text-lg">Your Mug Creation</h3>
      <p className="text-sm">Will appear here once generated.</p>
    </div>
  );
  
  return (
    <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center p-2 border-4 border-gray-300 border-dashed">
      {isLoading && <Spinner />}
      {error && !isLoading && (
        <div className="text-center text-red-600 p-4">
          <p><strong>Error</strong></p>
          <p>{error}</p>
        </div>
      )}
      {imageUrl && !isLoading && !error && (
        <img 
          src={imageUrl} 
          alt="Generated holiday mug" 
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 animate-fade-in"
          style={{ animation: 'fadeIn 0.5s forwards' }}
        />
      )}
      {!isLoading && !error && !imageUrl && <Placeholder />}
    </div>
  );
};

// Add keyframes for fade-in animation in a style tag for broader compatibility
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
}
`;
document.head.appendChild(style);

export default ImageDisplay;
