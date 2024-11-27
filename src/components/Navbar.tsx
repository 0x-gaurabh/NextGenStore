"use client";
import React, { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-100 shadow-xl p-4 relative">
      
      <div className="flex justify-between items-center">
        
        <Link href={"/"}>
          <h1 className="font-bold  text-2xl sm:text-3xl text-gray-800">
            NEXTGENSTORE
          </h1>
        </Link>

   
        <button
          className="text-gray-800 text-2xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

      
        <ul className="hidden sm:flex gap-16 items-center text-lg text-gray-800">
          <li className="flex items-center">
            <Link href={"/"} className="text-gray-600 hover:text-black hover:underline">
              Home
            </Link>
            <IoHomeSharp className="ml-2 text-gray-800" />
          </li>
          <li className="flex items-center">
            <Link
              href={"/product"}
              className="text-gray-600 hover:text-black hover:underline"
            >
              Products
            </Link>
            <FaShoppingBag className="ml-2 text-gray-800" />
          </li>
          <li className="flex items-center">
            <Link
              href={"/cart"}
              className="text-gray-600 hover:text-black hover:underline"
            >
              Cart
            </Link>
            <BsFillCartFill className="ml-2 text-gray-800" />
          </li>
        </ul>

       
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => open()}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg shadow-md text-gray-700 font-semibold"
          >
            {address ? address.slice(0, 10) : "Not connected"}
          </button>
        </div>
      </div>

      
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-neutral-100 shadow-md z-20 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col mt-20 p-6 gap-6 text-lg text-gray-800">
          <li>
            <Link
              href={"/"}
              className="flex items-center text-gray-600 hover:text-black hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Home <IoHomeSharp className="ml-2 text-gray-800" />
            </Link>
          </li>
          <li>
            <Link
              href={"/product"}
              className="flex items-center text-gray-600 hover:text-black hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Products <FaShoppingBag className="ml-2 text-gray-800" />
            </Link>
          </li>
          <li>
            <Link
              href={"/cart"}
              className="flex items-center text-gray-600 hover:text-black hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart <BsFillCartFill className="ml-2 text-gray-800" />
            </Link>
          </li>
       
          <li  >
            <button 
              onClick={() => {
                open();
                setIsMenuOpen(false);
              }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg shadow-md text-gray-700 font-semibold w-full"
            >
              {address ? address.slice(0, 10) : "Not connected"}
            </button>
          </li>
        </ul>
      </div>


      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
