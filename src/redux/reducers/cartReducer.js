import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  createOrder,
  getCartItems,
  getItemsDetails,
  updateCart,
} from "../../services/cart";

const INITIAL_STATE = {
  cart: [],
  total: 0,
  item: 0,
  loading: false,
  message: "",
};

//handle using try and catch

// add items to cart
export const addNewCartItem = createAsyncThunk(
  "cart/addNewItem",
  async (payload, {dispatch}) => {
    try {
      const {id, user, cart} = payload;
      const index = cart.findIndex(e => e.id === id);
      const newList = [...cart];
      if (index >= 0) {
        // increase quantity in existing list
        newList[index] = {id, quantity: newList[index].quantity + 1};
        dispatch(cartActions.setCart(newList));
        dispatch(cartActions.setMessage("Item count increased"));
      } else {
        // add new item to list
        newList.push({id, quantity: 1});
        dispatch(cartActions.setCart(newList));
        dispatch(cartActions.setMessage("New Item added"));
      }
      updateCart(user, newList);
    } catch (e) {
      console.log(e);
      dispatch(cartActions.setMessage("Something went wrong!"));
    }
  }
);

// remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (payload, {dispatch}) => {
    try {
      const {id, user, cart} = payload;
      const newList = cart.filter(e => e.id !== id);
      updateCart(user, newList);
      dispatch(cartActions.setMessage("Item removed from cart"));
    } catch (e) {
      console.log(e);
      dispatch(cartActions.setMessage("Something went wrong!"));
    }
  }
);

// update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (payload, {dispatch}) => {
    try {
      const {change, id, user, cart} = payload;
      const index = cart.findIndex(e => e.id === id);
      const newList = [...cart];
      const newItem = {
        ...newList[index],
        quantity: newList[index].quantity + change,
      };
      newList[index] = newItem;
      if (newList[index].quantity === 0) {
        newList.splice(index, 1);
      }
      dispatch(cartActions.setCart(newList));
      updateCart(user, newList);
      dispatch(cartActions.setMessage("Item count updated"));
    } catch (e) {
      console.log(e);
      dispatch(cartActions.setMessage("Something went wrong!"));
    }
  }
);

// confirm order
export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (payload, {dispatch}) => {
    try {
      const {user, cart} = payload;
      const order = cart?.map(e => {
        return {
          id: e.id,
          quantity: e.quantity,
        };
      });
      createOrder({order, id: user});
      updateCart(user, []);
    } catch (e) {
      console.log(e);
      dispatch(cartActions.setMessage("Something went wrong!"));
    }
  }
);

// set initial cart item
export const getInitialCartItems = createAsyncThunk(
  "cart/getInitialCartItem",
  async (payload, {dispatch}) => {
    try {
      const user = payload;
      getCartItems(async doc => {
        const newList = doc.data()?.cart?.map(async e => {
          // get product details from id doc id stored in card
          const data = await getItemsDetails(e.id);
          // save product details and quantity in cart
          return {
            ...data.data(),
            ...e,
          };
        });
        // Wait for all promises to resolve
        let newCart = [];
        if (newList) {
          newCart = await Promise.all(
            newList?.filter(item => item !== undefined && item !== null)
          );
        }

        dispatch(cartActions.setCart(newCart));
        const price = newCart?.reduce(
          (acc, curr) => curr.price * curr.quantity + acc,
          0
        );
        const item = newCart?.reduce((acc, curr) => curr.quantity + acc, 0);
        dispatch(cartActions.setTotal(price));
        dispatch(cartActions.setItem(item));
        dispatch(cartActions.setLoading(false));
      }, user);
    } catch (e) {
      console.log(e);
      dispatch(cartActions.setMessage("Something went wrong!"));
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCart: (state, action) => {
      state.cart = [...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

// reducer
export const cartReducer = cartSlice.reducer;

// actions
export const cartActions = cartSlice.actions;

// selector
export const cartSelector = state => state.cartReducer;
