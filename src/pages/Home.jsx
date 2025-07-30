import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Rewind } from 'lucide-react';
import Pricing from '../components/Pricing';

const Home = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start with true since we're autoplaying

  // Replace with your actual video path
  const videoSrc = "/videos/showreel.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video to autoplay initially
    video.play().catch(error => {
      console.log("Autoplay prevented:", error);
      // Handle cases where autoplay is blocked by browser
      setIsPlaying(false);
    });

    const handleScroll = () => {
      const scrollProgress = window.scrollY / window.innerHeight;
      
      // Update video playback
      video.currentTime = scrollProgress * video.duration;
      
      // REVERSED play/pause logic:
      // Pause when scrolling (progress > 0), play when at top (progress === 0)
      if (scrollProgress > 0) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      {/* Video Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full-screen video background */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Content container with proper spacing */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-special-gothic">
              RICHPIXEL <span className="text-red-600">EDITS</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8">
              Cinematic storytelling through expert editing
            </p>

            {/* Video Controls */}
            <div className="flex justify-center space-x-4">
              <button 
                onClick={togglePlay}
                className="flex items-center bg-black bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-full transition-all"
              >
                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button 
                onClick={() => {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                  setIsPlaying(true);
                }}
                className="flex items-center bg-black bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-full transition-all"
              >
                <Rewind className="mr-2" /> Replay
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm animate-bounce">
          Scroll to scrub video
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />
    </div>
  );
};

export default Home;