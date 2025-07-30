import { FiDownload, FiHeadphones, FiMusic, FiFilm, FiImage, FiYoutube } from 'react-icons/fi';

const products = [
  {
    id: 1,
    name: "Premium Mod APK Bundle",
    category: "modapk",
    description: "50+ premium modified Android apps with unlocked features",
    longDescription: "Get lifetime access to premium apps without subscriptions. Includes gaming mods, productivity tools, and creative apps with all pro features unlocked. Regular updates included.",
    price: 24.99,
    features: [
      "50+ premium apps",
      "No ads or limitations",
      "Lifetime updates",
      "Detailed installation guide",
      "24/7 support"
    ],
    previewType: "youtube",
    previewContent: "https://youtu.be/T6MFZH8k8tU?si=FODA2vpz12Dj232T", // Replace with actual video ID
    coverImage: "/products/modapk-bundle.jpg",
    icon: "download",
    fileTypes: ["APK", "XAPK"],
    tags: ["Android", "No Root", "Premium"]
  },
  {
    id: 2,
    name: "Trap God Beat Pack",
    category: "beats",
    description: "20 hard-hitting trap beats with stems",
    longDescription: "Professional trap beats perfect for rappers and content creators. Each beat includes mixed/mastered versions plus STEM files for customization. BPM and key included.",
    price: 29.99,
    features: [
      "20 unique trap beats",
      "Includes STEM files",
      "150-170 BPM range",
      "24-bit WAV format",
      "Unlimited licenses"
    ],
    previewType: "youtube",
    previewContent: "https://www.youtube.com/watch?v=T6MFZH8k8tU",
    coverImage: "/products/trap-beats.jpg",
    icon: "music",
    fileTypes: ["WAV", "MP3", "STEMS"],
    tags: ["Trap", "Hard", "Dark"]
  },
  // Add 10+ more products with different categories...
  {
    id: 12,
    name: "4K Stream Overlay Pack",
    category: "overlays",
    description: "Professional overlays for Twitch/YouTube streamers",
    longDescription: "Complete streaming package with animated overlays, alerts, and panels. Fully customizable in After Effects. Works with OBS, Streamlabs, and more.",
    price: 39.99,
    features: [
      "10+ animated overlays",
      "Customizable colors",
      "4K resolution",
      "After Effects files included",
      "Installation guide"
    ],
    previewType: "youtube",
    previewContent: "https://www.youtube.com/watch?v=STREAM_OVERLAY_DEMO", // Replace with actual video ID
    coverImage: "/products/stream-overlay.jpg",
    icon: "image",
    fileTypes: ["MP4", "PSD", "AEP"],
    tags: ["Twitch", "Gaming", "Animated"]
  }
];

export default products;