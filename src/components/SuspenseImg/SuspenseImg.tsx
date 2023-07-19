// @ts-nocheck
import React, { Suspense } from 'react';
// Image cache utility
const imgCache = {
  __cache: {}, // Object to store cached images

  read(src) {
    // Check if the image is already cached
    if (!this.__cache[src]) {
      // If not cached, create a new Promise to load the image
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();

        // Set up an onload event handler to resolve the Promise when the image is loaded
        img.onload = () => {
          this.__cache[src] = true; // Mark the image as loaded
          resolve(this.__cache[src]); // Resolve the Promise with the loaded image
        };

        // Set the source of the image
        img.src = src;
      }).then((img) => {
        this.__cache[src] = true; // Mark the image as loaded
      });
    }

    // If the image is still loading (Promise), throw the Promise to trigger suspense
    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }

    // Return the cached image or loaded Promise
    return this.__cache[src];
  },
};

// SuspenseImg component
export const SuspenseImg = ({ src, ...rest }) => {
  imgCache.read(src); // Load the image using the image cache
  return <img src={src} {...rest} />; // Render the image
};
