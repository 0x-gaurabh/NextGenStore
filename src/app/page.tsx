"use client";

import { fetchProduct } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Section from "@/components/Section";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

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

  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const [product, setProduct] = useState<Product[] | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Sync Redux products to local state
  useEffect(() => {
    if (products) {
      setProduct(products);
    }
  }, [products]);

  const { isConnected } = useAccount();
  const router = useRouter();

  // Redirect to login if not connected
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isConnected) {
        router.push("/login");
      } else {
        console.log("User is logged in");
      }
    }
  },[isConnected]);

  return (
    <div>
      {/* Section Component */}
      <Section />
    </div>
  );
}
