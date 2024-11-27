"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const page = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  const handle = () => {
    router.push("/");
  };


  return (
    <div className="min-h-screen -mt-10 flex items-center justify-center ">
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-green-600 text-white text-center py-5 text-2xl font-extrabold">
          🎉 Thank You!
        </div>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Confirmed Successfully
          </h2>
          <p className="text-gray-600 mb-6">
            Your purchase has been processed. We are preparing your order for
            delivery!
          </p>

          <div className="mb-6 flex justify-center">
            <svg
              className="w-24 h-24 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <div className="mb-6 text-green-600 font-medium text-lg">
            You have been sent <strong>10 tokens</strong> as a reward!
          </div>

          <button
            onClick={handle}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
