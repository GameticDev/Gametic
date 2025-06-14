import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "cdn.pixabay.com",
    ],
  },
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'motion-dom': require.resolve('framer-motion/dist/es/motion-dom'),
  //   };
  //   return config;
  // },
};

export default nextConfig;
