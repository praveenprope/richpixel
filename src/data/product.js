import { FiDownload, FiHeadphones, FiMusic, FiFilm, FiImage } from 'react-icons/fi';

const products = [
  {
    id: 1,
    name: "Premium Mod APK Bundle",
    category: "modapk",
    description: "Collection of premium modified apps with unlocked features",
    longDescription: "Get access to 10+ premium apps with all features unlocked...",
    price: 9.99,
    features: [
      "10+ premium apps included",
      "No ads or limitations",
      "1 year of free updates"
    ],
    previewUrl: null,
    coverImage: "/images/modapk-bundle.jpg",
    icon: "download" // Just use string identifiers instead of JSX
  },
  // ... other products
];

export default products;