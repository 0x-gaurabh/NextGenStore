import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  cart: [],
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
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((item: any) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
    },
  },
});

export const { addToCart, removeCart, increment, decrement } =
  CartSlice.actions;
export default CartSlice.reducer;
