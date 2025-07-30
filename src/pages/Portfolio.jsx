import React from 'react';
import { PlayCircle, Film, Clapperboard } from 'lucide-react';

const Portfolio = () => {
  // Sample portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Wedding Highlights",
      category: "Event Videography",
      thumbnail: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Travel Vlog",
      category: "Travel Content",
      thumbnail: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Product Commercial",
      category: "Advertising",
      thumbnail: "https://images.unsplash.com/photo-1574717024453-3545edf62d91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Music Video",
      category: "Entertainment",
      thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Short Film",
      category: "Cinematic",
      thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    },
    {
      id: 6,
      title: "Corporate Video",
      category: "Business",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated icon */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Clapperboard className="h-10 w-10 text-red-600 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-special-gothic tracking-wider">
            MY CREATIVE PORTFOLIO
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my best video editing projects across different genres
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                </div>
                <a 
                  href={item.link} 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-red-600/90 rounded-full p-4 backdrop-blur-sm">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-transparent border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center mx-auto group">
            VIEW ALL PROJECTS
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;