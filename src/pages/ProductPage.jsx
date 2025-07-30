import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiPlay, FiPause, FiArrowLeft } from 'react-icons/fi';
import products from '../data/product';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio() : null);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button 
            onClick={() => navigate('/pixelstore')}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const togglePlayback = () => {
    if (!product.previewUrl) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = product.previewUrl;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback failed:", err));
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-black"
          >
            <FiArrowLeft className="mr-2" /> Back to Store
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-1/2">
              <div className="relative">
                <img 
                  src={product.coverImage} 
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {product.previewUrl && (
                  <button
                    onClick={togglePlayback}
                    className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all"
                  >
                    {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                  </button>
                )}
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl font-semibold text-gray-800 mb-4">${product.price}</p>
              
              <div className="flex items-center mb-6">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{product.longDescription}</p>

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart - ${product.price}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.previewUrl && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={togglePlayback}
                      className="bg-black text-white p-3 rounded-full hover:bg-gray-800 mr-4"
                    >
                      {isPlaying ? <FiPause /> : <FiPlay />}
                    </button>
                    <div>
                      <p className="font-medium">Sample Preview</p>
                      <p className="text-sm text-gray-500">30 second preview</p>
                    </div>
                  </div>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: isPlaying ? '30%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;