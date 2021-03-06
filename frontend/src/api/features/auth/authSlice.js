import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../axios';

import authService from './authService';

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  // user: user ? user : null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user from local storage
export const getUserFromLocalStorege = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      return authService.getUserFromLocalStorege();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const loginData = await authService.login(user);
    axiosInstance.defaults.headers.authorization = `Bearer ${loginData.token}`;
    return loginData;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  axiosInstance.defaults.headers.authorization = '';
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserFromLocalStorege.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserFromLocalStorege.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
