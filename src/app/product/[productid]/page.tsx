"use client"
import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "@/redux/store";
import { addToCart } from '@/redux/slices/cartSlice';
import { ToastContainer } from 'react-toastify';



const ProductsDetail = ({ params }: { params: Promise<{ productid: string }> }) => {

    interface Items {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: {
          rate: number;
          count: number;
        };
    }
    const { productid } = use(params);
    
    const [item, setItem] = useState <Items| null>(null);
    const {products,loading,error} =useSelector((state :RootState) =>state.product)

    const dispatch=useDispatch<AppDispatch>(); 

        useEffect(() => {
            if (!products) return;
            const filterProduct = products.find((p) => p.id === Number(productid));
            setItem(filterProduct || null); // Update item to first product or empty object
        }, [productid, products]); // Added products to dependencies

    return (
        <div >
            <ToastContainer />
            <div className="py-8 mt-24 flex justify-center items-center">
  <div className="container mx-auto px-4 sm:px-6 md:px-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-4 flex justify-center">
          {item && item.image ? (
            <img
              src={item.image}
              alt="Product"
              className="rounded-lg w-64 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        
        {/* Product Details Section */}
        <div className="md:w-1/2 md:ml-6 p-4">
          <h1 className="text-3xl font-bold mb-2">
            {item && item.title || "Loading title..."}
          </h1>
          <p className="text-gray-600 mb-4">
            {item && item.description || "Loading description..."}
          </p>
          <p className="text-xl font-bold text-gray-800 mb-2">
            ${item && item.price || "Loading price..."}
          </p>
          <button
            onClick={() => dispatch(addToCart({ id: item && item.id, qty: 1, image: item && item.image, title: item && item.title, price: item && item.price }))}
            className="w-full mt-4 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

           
        </div>
    );
};

export default ProductsDetail;