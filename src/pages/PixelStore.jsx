import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import products from '../data/product';

const PixelStore = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            PixelStore
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Premium digital assets for creators
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
          >
            All Products
          </button>
          {[...new Set(products.map(p => p.category))].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${activeCategory === category ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={product.coverImage} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.previewType && (
                  <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    {product.previewType === 'youtube' ? 'Video' : 'Audio'} Preview
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <FiStar className="fill-current w-4 h-4" />
                    <span className="text-gray-600 ml-1 text-sm">4.8</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">${product.price}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelStore;