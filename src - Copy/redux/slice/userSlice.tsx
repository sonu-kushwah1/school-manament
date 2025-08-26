import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔹 Define User type
export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  fname: string;
}

// 🔹 Initial state
interface UserState {
  data: User[];
  singleUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  singleUser: null,
  loading: false,
  error: null,
};

// 🔹 API URL
const API_URL = 'http://localhost:3002/teacher_list';

// ✅ Fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// ✅ Fetch single user by ID
export const fetchUserById = createAsyncThunk<User, number>(
  'users/fetchUserById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

// ✅ Create user
export const createUser = createAsyncThunk<User, Omit<User, 'id'>>(
  'users/createUser',
  async (newUser) => {
    const response = await axios.post(API_URL, newUser);
    return response.data;
  }
);

// ✅ Delete user
export const deleteUser = createAsyncThunk<number, number>(
  'users/deleteUser',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// ✅ Update user
export const updateUser = createAsyncThunk<User, User>(
  'users/updateUser',
  async (updatedUser) => {
    const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
    return response.data;
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // 🔹 Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user by ID';
      })

      // 🔹 Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })

      // 🔹 Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      })

      // 🔹 Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

export default userSlice.reducer;
