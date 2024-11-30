"use client";
import React, { useState } from "react";
import bg from "../assets/bg.jpg";
import Image from "next/image";
import Product from "@/app/product/page";

const Section = () => {
  // State for image loading
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              {/* Spinner */}
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
            </div>
          )}
          <Image
            src={bg}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            alt="image not found"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>

        {/* Text Content */}
        <div className="absolute bottom-16 left-4 sm:bottom-20 sm:left-8 lg:bottom-28 lg:left-12 xl:bottom-32 xl:left-16 p-4 text-white w-full max-w-screen-lg mx-auto">
          <h1 className="font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-nowrap mb-2 md:mb-4">
            NEW SEASON ARRIVAL
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light">
            CHECK OUT ALL TRENDS
          </p>
        </div>
      </div>
      <Product />
    </>
  );
};

export default Section;
