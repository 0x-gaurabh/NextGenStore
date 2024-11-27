"use client"
import React from 'react'
import bg from '../assets/bg.jpg';
import Image from "next/image";
import Product from '@/app/product/page';



const Section = () => {

  return (
    <>
    <div className="relative">
    {/* Background Image */}
    <div>
      <Image
        src={bg}
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full object-cover"
        alt="image not found"
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
  
      

  )
}

export default Section