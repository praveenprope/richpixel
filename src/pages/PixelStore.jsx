import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import products from '../data/product';

const PixelStore = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setCart([...cart, product]);
  };

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
            Premium digital assets for creators and developers
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

        <div className="fixed top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
          <div className="flex items-center">
            <FiShoppingCart className="text-gray-700 text-xl mr-2" />
            <span className="font-medium">{cart.length} items</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {product.icon}
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{product.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <ul className="mb-6">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">
                Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixelStore;