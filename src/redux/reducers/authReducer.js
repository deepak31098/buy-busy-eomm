import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  createNewUser,
  getUserAuth,
  loginUser,
  saveNewUserInfo,
  signOutUser,
} from "../../services/user";

// initial state
const INITIAL_STATE = {user: null, path: null, loading: false, message: ""};

// handle using builder

// initial state and setting listener
export const getAuthState = createAsyncThunk(
  "auth/getAuthState",
  async (_, {dispatch}) => {
    getUserAuth(user => {
      const uid = user ? user?.uid : null;
      dispatch(authActions.setUser(uid));
    });
  }
);

// sign in
export const signInUser = createAsyncThunk("auth/signIn", async payload =>
  loginUser(payload)
);

// sign up
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (payload, {dispatch}) => {
    try {
      const userCredential = await createNewUser(payload);
      const info = {
        id: userCredential?.user?.uid,
        data: {
          name: payload.name,
          cart: [],
        },
      };
      dispatch(createNewUserId(info));
    } catch (e) {
      console.log(e);
      dispatch(authActions.loading(false));
      dispatch(authActions.setMessage("User exists!"));
    }
  }
);

export const createNewUserId = createAsyncThunk(
  "auth/createUser",
  async payload => saveNewUserInfo(payload)
);

// logout
export const logoutUser = createAsyncThunk("auth/logout", async () =>
  signOutUser()
);

// create slice
export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      if (action.payload) state.path = "/";
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setPath: (state, action) => {
      state.path = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.fulfilled, state => {
        state.message = "Logged in successfully";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.message = action?.error?.message || "Something went wrong";
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.message = "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.message = action?.error?.message || "Something went wrong";
      })
      .addCase(createNewUserId.fulfilled, state => {
        state.message = "User created successfully";
      })
      .addCase(createNewUserId.rejected, (state, action) => {
        state.message = action?.error?.message || "Something went wrong";
        state.loading = false;
      });
  },
});

// reducer
export const authReducer = authSlice.reducer;

// actions
export const authActions = authSlice.actions;

// selector
export const authSelector = state => state.authReducer;
