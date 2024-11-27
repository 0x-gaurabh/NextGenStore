"use client";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import cart from "../../assets/emptyCart.png";
import Image from "next/image";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { decrement, increment, removeCart } from "@/redux/slices/cartSlice";
import { ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";


const Cart = () => {
  const cartItem = useSelector((state: RootState) => state.cart.cart);
  const router = useRouter();
  const [accounts, setAccounts] = useState("");
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | undefined>(
    undefined
  );
  const [ethPrice, setEthPrice] = useState();
  const [balance, setBalance] =useState<string>("0")

  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = cartItem.reduce(
    (acc: any, item: any) => acc + item.price * item.qty,
    0
  );
  

  useEffect(() => {
    const getSigner = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
           const account= await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.BrowserProvider(window.ethereum);

          const signer = await provider.getSigner();
          // console.log(signer);
          setAccounts(account[0]);

          setSigner(signer);
          
        } catch (err) {
          console.log("Error is", err);
        }
      } else {
        console.log("Not connected ");
      }
    };

    const getEthUsdRate = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        const ethUsdRate = data.ethereum.usd;
        setEthPrice(ethUsdRate);
        // console.log(`ETH/USD rate from CoinGecko: $${ethPrice}`);

        return ethUsdRate;
      } catch (error) {
        console.error("Error fetching ETH/USD rate:", error);
      }
    };

    getSigner();
    getEthUsdRate();
  }, []);

  const handleBuy = async (usdAmount: number) => {
    try {
      if (typeof ethPrice === "undefined" || ethPrice === null) {
        throw new Error("Ethereum price (ethPrice) is not available.");
      }
      const contractAdd = "0x9699A5A1d01E061cc77a60334805E89633f2E2dB";
      const abi = [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_fivePercentThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_tenPercentThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_twentyPercentThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_fivePercentDiscount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_tenPercentDiscount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_twentyPercentDiscount",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "allowance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientAllowance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientBalance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "approver",
              type: "address",
            },
          ],
          name: "ERC20InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
          ],
          name: "ERC20InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSpender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          inputs: [],
          name: "ReentrancyGuardReentrantCall",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "buyer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "pricePaid",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "tokensMinted",
              type: "uint256",
            },
          ],
          name: "TokenPurchased",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "buy",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "data",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "fivePercentDiscount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "fivePercentThreshold",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_account",
              type: "address",
            },
          ],
          name: "getBalance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "newThreshold",
              type: "uint256",
            },
          ],
          name: "setFivePercentThreshold",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "newThreshold",
              type: "uint256",
            },
          ],
          name: "setTenPercentThreshold",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "newThreshold",
              type: "uint256",
            },
          ],
          name: "setTwentyPercentThreshold",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tenPercentDiscount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tenPercentThreshold",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "twentyPercentDiscount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "twentyPercentThreshold",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];
      const contractIns = new ethers.Contract(contractAdd, abi, signer);
      const ethUsdRate = ethPrice;

      let ethValue = usdAmount / ethUsdRate;
      ethValue = parseFloat(ethValue.toFixed(18));
      const ethValueWei = ethers.parseEther(ethValue.toString());

      const tx = await contractIns.buy({ value: ethValueWei });
      const receipt = await tx.wait();
       console.log(receipt);
       
      // Check if transaction was successful
      if (receipt) {
       router.push("/checkout");
      } else {
        console.log("Transaction failed");
      }
    } catch (error: any) {
      console.error("Error in handleBuy:", error.message);
    }
  };

  useEffect(() =>{
    const handleToken =async() =>{
      if (!signer || !accounts) return;  
     
      const contractAdd = "0x9699A5A1d01E061cc77a60334805E89633f2E2dB";
      const abi =  [
        {
          "inputs": [
            {
              "internalType": "uint256",
         "name": "_fivePercentThreshold",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "_tenPercentThreshold",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "_twentyPercentThreshold",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "_fivePercentDiscount",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "_tenPercentDiscount",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "_twentyPercentDiscount",
         "type": "uint256"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "constructor"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "allowance",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "needed",
         "type": "uint256"
       }
     ],
     "name": "ERC20InsufficientAllowance",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "sender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "balance",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "needed",
         "type": "uint256"
       }
     ],
     "name": "ERC20InsufficientBalance",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "approver",
         "type": "address"
       }
     ],
     "name": "ERC20InvalidApprover",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "receiver",
         "type": "address"
       }
     ],
     "name": "ERC20InvalidReceiver",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "sender",
         "type": "address"
       }
     ],
     "name": "ERC20InvalidSender",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       }
     ],
     "name": "ERC20InvalidSpender",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       }
     ],
     "name": "OwnableInvalidOwner",
     "type": "error"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "OwnableUnauthorizedAccount",
     "type": "error"
   },
   {
     "inputs": [],
     "name": "ReentrancyGuardReentrantCall",
     "type": "error"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "Approval",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "previousOwner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "OwnershipTransferred",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "address",
         "name": "buyer",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "pricePaid",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "tokensMinted",
         "type": "uint256"
       }
     ],
     "name": "TokenPurchased",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "Transfer",
     "type": "event"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       }
     ],
     "name": "allowance",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "approve",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "balanceOf",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "buy",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "data",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "decimals",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "fivePercentDiscount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "fivePercentThreshold",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "_account",
         "type": "address"
       }
     ],
     "name": "getBalance",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "name",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "owner",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "renounceOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "newThreshold",
         "type": "uint256"
       }
     ],
     "name": "setFivePercentThreshold",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "newThreshold",
         "type": "uint256"
       }
     ],
     "name": "setTenPercentThreshold",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "newThreshold",
         "type": "uint256"
       }
     ],
     "name": "setTwentyPercentThreshold",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "symbol",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "tenPercentDiscount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "tenPercentThreshold",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalSupply",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "transfer",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "transferFrom",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "transferOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "twentyPercentDiscount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "twentyPercentThreshold",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "withdraw",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   }
 ]
 
 const contractIns = new ethers.Contract(contractAdd, abi, signer);
 const accountBalance= await contractIns.getBalance(accounts);

 
 const Balance = ethers.formatUnits(accountBalance, 18);

 
 setBalance(Balance);
}

handleToken();


  },[accounts])

  const { isConnected } = useAccount();
 

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isConnected) {
        router.push("/login");
      } else {
        console.log("User is logged in");
      }
    }
  }, [isConnected]);

  if (cartItem.length === 0) {
    return (
      <div className="flex justify-center items-center mt-14 flex-col px-4">
      
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
          Your Cart is Empty
        </h1>
        <Image
          src={cart}
          className="mx-auto h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] mb-10"
          alt="Image not found"
        />
      </div>
    
     
      <div className="mt-12">
        <button className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-200 ease-in-out">
          <Link href={"/product"}>Browse Products</Link>
        </button>
      </div>
    </div>
    

    );
  }
  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mt-6 mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 mb-5 py-2 shadow-md">
        <p className="text-sm text-gray-500">Your Token Balance</p>
        <p className="text-lg font-semibold text-gray-800">
        {Number(balance).toFixed(0)}{`{BTK}`}
        </p>
      </div>

        <div className="space-y-4">
          {cartItem.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white border rounded-lg p-4 shadow-lg mb-4"
            >
              <div className="w-full sm:w-1/4 flex justify-center items-center mb-4 sm:mb-0">
                <img
                  src={item.image}
                  alt="Item not found"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 sm:w-1/2 px-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Price: ${item.price.toFixed(0)}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3 sm:w-1/4 mb-4 sm:mb-0">
                <button
                  onClick={() =>
                    item.qty > 1
                      ? dispatch(decrement({ id: item.id }))
                      : dispatch(removeCart({ id: item.id }))
                  }
                  className="text-gray-700 border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition"
                >
                  <span className="text-lg font-bold">-</span>
                </button>
                <span className="text-lg font-medium">{item.qty}</span>
                <button
                  onClick={() => dispatch(increment({ id: item.id }))}
                  className="text-gray-700 border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>

              <div className="flex flex-col items-center sm:items-end sm:w-1/4">
                <p className="text-lg font-semibold text-gray-800">
                  ${Number(item.price * item.qty).toFixed(0)}
                </p>
                <button
                  onClick={() => dispatch(removeCart({ id: item.id }))}
                  className="mt-2 flex items-center text-red-500 hover:text-red-600 transition font-medium"
                >
                  <FaTrashAlt className="mr-1" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center border-t pt-4">
          <span className="text-xl mr-4 font-bold">Total:</span>
          <span className="text-xl font-bold">${totalPrice.toFixed(0)}</span>
        </div>
        <div className="flex justify-end -mt-6">
          <button
            onClick={() => handleBuy(totalPrice.toFixed(0))}
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
