import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/product';
import { 
  FiShoppingCart, 
  FiArrowLeft,
  FiDownload,
  FiHeadphones,
  FiYoutube,
  FiCheck,
  FiX
} from 'react-icons/fi';

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const [videoError, setVideoError] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  const getVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const renderPreview = () => {
    if (product.previewType === 'youtube') {
      const videoId = getVideoId(product.previewContent);
      
      if (!videoId || videoError) {
        return (
          <div className="bg-red-50 p-6 rounded-lg border border-red-100 flex flex-col items-center justify-center h-64">
            <FiX className="text-red-500 text-4xl mb-3" />
            <h3 className="text-red-800 font-medium mb-2">Video unavailable</h3>
            <a 
              href={product.previewContent} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline flex items-center transition-colors duration-150"
            >
              <FiYoutube className="mr-2" /> Watch on YouTube
            </a>
          </div>
        );
      }

      return (
        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg bg-black will-change-transform">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${product.name} Preview`}
            onError={() => setVideoError(true)}
          />
        </div>
      );
    }
    
    return (
      <div className="bg-gray-100 p-8 text-center rounded-lg h-64 flex items-center justify-center">
        <p className="text-gray-500">No preview available</p>
      </div>
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Not Found</h1>
          <button 
            onClick={() => navigate('/pixelstore')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            <FiArrowLeft className="mr-2" /> Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" /> Back to Store
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Media */}
            <div className="space-y-6">
              {/* Main Product Image - Removed preview badge from here */}
              

              {/* Preview Section - Now the only preview section */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  {product.previewType === 'youtube' ? (
                    <FiYoutube className="mr-2 text-red-500" />
                  ) : (
                    <FiHeadphones className="mr-2 text-purple-500" />
                  )}
                  Preview
                </h3>
                {renderPreview()}
              </div>

              {/* Product Details Card */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="font-medium capitalize text-gray-800">{product.category}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">File Types</p>
                    <p className="font-medium text-gray-800">{product.fileTypes.join(', ')}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-medium text-gray-800">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-gray-500 text-sm">Last Updated</p>
                    <p className="font-medium text-gray-800">June 2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm inline-block mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'description' 
                        ? 'border-black text-black' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === 'features' 
                        ? 'border-black text-black' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Features
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mb-8">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{product.longDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                        <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  addToCart(product);
                  // Add temporary visual feedback
                  const btn = document.activeElement;
                  btn.classList.add('scale-95');
                  setTimeout(() => btn.classList.remove('scale-95'), 150);
                }}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg transition-all duration-200 flex items-center justify-center font-medium shadow-lg hover:shadow-md active:scale-95 will-change-transform"
              >
                <FiShoppingCart className="mr-3" />
                Add to Cart - ${product.price.toFixed(2)}
              </button>

              {/* Guarantee Card */}
              <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <FiCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">Premium Quality Guarantee</p>
                    <p className="text-sm text-gray-600">30-day money back guarantee. If you're not satisfied, we'll refund your purchase.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;