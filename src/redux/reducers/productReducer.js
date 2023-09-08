import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  addNewProduct,
  getAllProducts,
  queryProducts,
} from "../../services/products";

// state
const INITIAL_STATE = {
  products: [],
  currentProducts: [],
  loading: false,
  message: "",
};

// handle using builder and try and catch

// get all products
export const getAllProductsAvailable = createAsyncThunk(
  "product/allProducts",
  async (payload, {dispatch}) => {
    try {
      getAllProducts(snapshot => {
        const product = snapshot?.docs?.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(productActions.setProducts(product));
        const newProductList = product?.filter(e =>
          e.name.toLowerCase().includes(payload)
        );
        dispatch(productActions.setCurrentProducts(newProductList));
        dispatch(productActions.setLoading(false));
      });
    } catch (e) {
      console.log(e);
      dispatch(productActions.setLoading(false));
      dispatch(productActions.setMessage("Something went wrong!"));
    }
  }
);

// query products
export const queryAllProducts = createAsyncThunk(
  "product/queryProducts",
  async (payload, {dispatch}) => {
    const {filterCategory, filterPrice, filterItem} = payload;
    const query = {filterCategory, filterPrice};
    try {
      queryProducts(snapshot => {
        const product = snapshot?.docs?.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        dispatch(productActions.setProducts(product));
        const newProductList = product?.filter(e =>
          e.name.toLowerCase().includes(filterItem)
        );
        dispatch(productActions.setCurrentProducts(newProductList));
        dispatch(productActions.setLoading(false));
      }, query);
    } catch (e) {
      console.log(e);
      dispatch(productActions.setLoading(false));
      dispatch(productActions.setMessage("Something went wrong!"));
    }
  }
);

// add product
export const addProduct = createAsyncThunk(
  "product/addNewProduct",
  async payload => addNewProduct(payload)
);

export const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    setProducts: (state, action) => {
      state.products = [...action.payload];
    },
    setCurrentProducts: (state, action) => {
      state.currentProducts = [...action.payload];
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.message = "New Product added to list";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = "Please try later";
      });
  },
});

// reducer
export const productReducer = productSlice.reducer;

// actions
export const productActions = productSlice.actions;

// selector
export const productSelector = state => state.productReducer;
