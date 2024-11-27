"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "@/redux/store";
import { fetchProduct } from "@/redux/slices/productSlice";
import Link from 'next/link';
import { addToCart } from '@/redux/slices/cartSlice';
import { ToastContainer } from 'react-toastify';
import "./loader.css"
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';





const Product = () => {

  
    const dispatch=useDispatch<AppDispatch>(); 
    const {products,loading,error} =useSelector((state :RootState) =>state.product)

    interface Product {
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
      const [product, setProduct] = useState <Product[] | null>([])
      useEffect(() =>{
        dispatch(fetchProduct())
      },[])

     useEffect(() => {
    // Update local state when products change
    if (products) {
      setProduct(products);
    }
  }, [products]);
 
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isConnected) {
        router.push("/login");
      } else {
        console.log("User is logged in");
      }
    }
  },[isConnected]);
        

  const handleFilter = (category: string) => {
    if (!products) return; // Use the original products list for filtering
  
    if (category === "All") {
      setProduct(products); // Reset to the full list
    } else {
      const filteredProducts = products.filter(
        (item) => item.category === category
      );
      setProduct(filteredProducts);
    }
  };
  // console.log(product);
  

  const Loading = () => {

      

    return(
      // <div className="loader"></div>
      <div className="spinner mt-24"></div>
    )
  }

  const ShowProduct = () => {
    return(
      <>
      <ToastContainer />
<div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2  sm:justify-center sm:items-center md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 sm:p-6 md:p-8">
  {product &&
    product.map((product: any) => (
      <div
        key={product.id}
        className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* Product Image */}
        <div className="flex justify-center items-center p-4 sm:p-6">
          <Link href={`/product/${product.id}`}>
            <img
              className="w-36 h-36 object-contain transition duration-300 hover:opacity-90"
              src={product.image}
              alt={product.title}
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h2>

          <div className="flex justify-between items-center mt-4">
            {/* Styled Price */}
            <span className="px-3 py-1 border rounded-full font-medium transition duration-300 bg-gray-100 border-gray-400">
              ${product.price.toFixed(0)}
            </span>

            {/* Rating */}
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.287 3.94 4.1.314a1 1 0 01.564 1.786l-3.103 2.289 1.066 3.906a1 1 0 01-1.518 1.118L10 13.868l-3.347 2.412a1 1 0 01-1.518-1.118l1.066-3.906-3.103-2.289a1 1 0 01.564-1.786l4.1-.314 1.287-3.94z" />
              </svg>
              <span className="ml-1 text-gray-700">{product.rating.rate}</span>
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  qty: 1,
                  image: product.image,
                  title: product.title,
                  price: product.price,
                })
              )
            }
            className="w-full mt-4 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-sm transition duration-300 transform hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
</div>

    </>
    )
}

    
  return (

    <div>
  
            <div className="flex justify-center items-center flex-col py-5">
            <div className="flex flex-col items-center mt-4 px-4">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-10">
    Latest Products
  </h1>

  <ul className="flex flex-wrap justify-center gap-3 md:gap-5">
    <li onClick={ () =>handleFilter("All")} className="border-gray-950 border-2 px-4 md:px-6 lg:px-7 py-1 md:py-2 cursor-pointer hover:bg-black hover:text-white rounded-md">
      All
    </li>
    <li onClick={() => handleFilter("men's clothing")} className="border-gray-950 border-2 px-4 md:px-6 lg:px-7 py-1 md:py-2 cursor-pointer hover:bg-black hover:text-white rounded-md">
      Men
    </li>
    <li onClick={() => handleFilter("women's clothing")} className="border-gray-950 border-2 px-4 md:px-6 lg:px-7 py-1 md:py-2 cursor-pointer hover:bg-black hover:text-white rounded-md">
      Women
    </li>
    <li onClick={() => handleFilter("electronics")} className="border-gray-950 border-2 px-4 md:px-6 lg:px-7 py-1 md:py-2 cursor-pointer hover:bg-black hover:text-white rounded-md">
      Electronics
    </li>
    <li onClick={() => handleFilter("jewelery")} className="border-gray-950 border-2 px-4 md:px-6 lg:px-7 py-1 md:py-2 cursor-pointer hover:bg-black hover:text-white rounded-md">
      Jewelry
    </li>
  </ul>
</div>


                <div className="row py-4 flex justify-center items-center">
                    {loading ? <Loading/> : <ShowProduct />}
                </div>
            </div>
        </div>

  )
}

export default Product
