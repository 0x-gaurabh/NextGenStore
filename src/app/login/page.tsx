"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import "./style.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const Page = () => {
  const { open } = useWeb3Modal();
  const router = useRouter();
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  console.log(address);

  useEffect(() => {
    if (address) {
      router.push("/");
    }
  }, [address]);

  // Function to open and close the modal
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="w-[200%] h-[200%] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50 blur-3xl animate-spin-slow"></div>
        <div className="w-[150%] h-[150%] bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center bg-white/90 backdrop-blur-md px-8 py-10 shadow-2xl rounded-2xl w-[90%] max-w-md">
        <iframe
          className="mb-6 w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
          src="https://lottie.host/embed/ed2bfe0d-2a12-4577-88c8-5fbe33d807be/glgGtQmNKa.lottie"
        ></iframe>

        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          NextGenstore
        </h1>
        <p className="text-gray-700 mb-8 text-lg">Shop Smart, Live Better.</p>

        <div className="w-full">
          <h2 className="text-xl font-medium mb-4 text-gray-800">LOGIN</h2>
          <button
            onClick={() => open()}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Connect Wallet
          </button>
        </div>

        {/* About Button */}
        <div className="mt-6">
          <button
            onClick={handleModalToggle} // Toggle the modal visibility on click
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
          >
            About NextGenstore
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                About NextGenstore
              </h3>
              <p className="text-gray-700 text-sm">
                NextGenstore is a decentralized e-commerce platform designed to
                offer secure and seamless transactions for users through
                blockchain technology.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                The Ecommerce smart contract is an ERC-20 token system that
                allows users to purchase tokens (BuyableToken - BTK) with Ether
                (ETH) and receive discounts based on the amount of tokens they
                hold. The contract provides different levels of discounts based
                on the user's token balance. It also allows the owner to
                withdraw the contract's ETH balance.
              </p>
              <button
                onClick={handleModalToggle} // Close the modal on button click
                className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
