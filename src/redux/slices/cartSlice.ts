import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadLocalStorage =() =>{
  try{
      const add=localStorage.getItem('cart')
      return add ? JSON.parse(add) : []
  } 
  catch{
      console.warn('Could not load data frm local storage');
      return [];
  } 
}

const saveToLocalStorage =(cart :any) => {
  try{
    const add=JSON.stringify(cart)
    localStorage.setItem('cart' ,add)
  }
  catch{
    console.warn("Could not save storgae dataa");
  }
}


interface CartItem {
  id: number;
  qty: number;
  image:string;
  title: string;
  price: number;
 
}

interface cartProps {
  cart: CartItem[];
}

const initialState: cartProps = {
  cart: loadLocalStorage(),
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exsit = state.cart.find(
        (item: any) => item.id === action.payload.id
      );

      if (exsit) {
        state.cart = state.cart.map((item: any) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        state.cart.push(action.payload);
      }
      saveToLocalStorage(state.cart)

      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: any) => item.id !== action.payload.id
      );
      saveToLocalStorage(state.cart)
      toast.success(`Item removed succesfully`, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },

    increment: (state, action) => {
      state.cart = state.cart.map((item: any) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
      saveToLocalStorage(state.cart)

    },
    decrement: (state, action) => {
      state.cart = state.cart.map((item: any) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
      saveToLocalStorage(state.cart)

    },
  },
});

export const { addToCart, removeCart, increment, decrement } =
  CartSlice.actions;
export default CartSlice.reducer;
