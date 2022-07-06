import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: [],
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// replace user
const updateUserInStore = (payload, users) => {
  const userIndex = users.findIndex((user) => user._id === payload._id);
  if (userIndex !== -1) {
    users[userIndex] = payload;
  }

  return users;
};

// Create new user
export const createUser = createAsyncThunk(
  'users/create',
  async ({ userData, callback }, thunkAPI) => {
    try {
      callback();

      return await userService.createUser(userData);
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

// Update user
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userData, callback, id }, thunkAPI) => {
    try {
      callback();

      return await userService.updateUser(userData, id);
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

//Get users
export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
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

//get one user
export const getOneUser = createAsyncThunk(
  'users/getOne',
  async ({ id, callback }, thunkAPI) => {
    try {
      const user = await userService.getOneUser(id);

      callback(user);

      return user;
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
export const getLoggedInUser = createAsyncThunk(
  'users/getMe',
  async (_, thunkAPI) => {
    try {
      const id = JSON.parse(localStorage.getItem('user')).user._id;

      return await userService.getOneUser(id);
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

//Delete user
export const deleteUser = createAsyncThunk(
  'users/delete',
  async ({ callback, id }, thunkAPI) => {
    try {
      callback();

      return await userService.deleteUser(id);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = [...state.users, action.payload];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = updateUserInStore(action.payload, state.users);
        state.user =
          state.user._id === action.payload._id ? action.payload : state.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOneUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLoggedInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
