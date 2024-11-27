import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the Product interface
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

// Define the state interface
interface DataProps {
  loading: boolean;
  products: Product[] | null;
  error: string | null;
}

// Initial state
const initialState: DataProps = {
  loading: false,
  products: [],
  error: null,
};

// Define the async thunk with proper types
export const fetchProduct = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProduct',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data; // Returns an array of Product
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch products'); // Custom error message
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // Add reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProduct.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetchProduct.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.products = null;
        state.error = action.payload || 'Something went wrong';
      }
    );
  },
});

export default productSlice.reducer;
