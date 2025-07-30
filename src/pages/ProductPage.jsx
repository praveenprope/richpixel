import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiPlay, 
  FiPause, 
  FiArrowLeft,
  FiDownload,
  FiHeadphones,
  FiYoutube
} from 'react-icons/fi';
import ReactPlayer from 'react-player';
import products from '../data/product';

const iconComponents = {
  download: <FiDownload className="text-blue-500 text-2xl" />,
  music: <FiHeadphones className="text-purple-500 text-2xl" />,
  image: <FiYoutube className="text-red-500 text-2xl" />
};

const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio() : null);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    return () => {
      if (audio) audio.pause();
    };
  }, [audio]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => navigate('/pixelstore')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const togglePlayback = () => {
    if (product.previewType === 'audio') {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.src = product.previewContent;
        audio.play().then(() => setIsPlaying(true));
      }
    }
  };

  const renderPreview = () => {
    switch(product.previewType) {
      case 'youtube':
        return (
          <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
            <ReactPlayer 
              url={product.previewContent}
              width="100%"
              height="100%"
              controls
              playing={false}
            />
          </div>
        );
      case 'audio':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlayback}
                className={`p-4 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-black'} text-white`}
              >
                {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
              </button>
              <div className="flex-1 ml-6">
                <h3 className="font-medium">Audio Preview</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: isPlaying ? '30%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-8 text-center rounded-lg">
            <p>No preview available</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Store
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img 
                  src={product.coverImage} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
                {product.previewType && (
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    {product.previewType === 'youtube' ? (
                      <FiYoutube className="mr-2" />
                    ) : (
                      <FiHeadphones className="mr-2" />
                    )}
                    {product.previewType === 'youtube' ? 'Video' : 'Audio'} Preview
                  </div>
                )}
              </div>

              {renderPreview()}

              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <p className="font-medium capitalize">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">File Types</p>
                    <p className="font-medium">{product.fileTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="font-medium">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Updated</p>
                    <p className="font-medium">June 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                  <h1 className="text-4xl font-bold mt-3">{product.name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">${product.price}</p>
                </div>
              </div>

              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'features' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Features
                  </button>
                </nav>
              </div>

              <div className="mb-8">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700 mb-6">{product.longDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center font-medium"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart - ${product.price}
                </button>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-green-800">Premium Quality Guarantee</p>
                    <p className="text-sm text-green-600">30-day money back guarantee</p>
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



























































































































































































































































































































































