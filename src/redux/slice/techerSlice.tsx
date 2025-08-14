import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// 🔹 Define Teacher type
export interface Teacher {
  id: number;
  fname: string;
  lname: string;
  gender: string;
  email: string;
  phone: number;
  dob: string;
  address: string;
  city: string;
  univercity: string;
  degree: string;
  subject:string;
}

// 🔹 Define State type
interface TeacherState {
  data: Teacher[];
  singleTeacher: Teacher | null;
  loading: boolean;
  error: string | null;
  successMessage: string;
}

//  Initial state
const initialState: TeacherState = {
  data: [],
  singleTeacher: null,
  loading: false,
  error: null,
  successMessage: "",
};

//  API URL
const API_URL = 'http://localhost:3001/teacher_list';

//  Fetch all teachers
export const fetchTeachers = createAsyncThunk<Teacher[]>(
  'teachers/fetchTeachers',
  async () => {
    const response = await axios.get(API_URL);
     console.log("data show slice",response.data);
    return response.data;
  }
);

//  Fetch single teacher
export const fetchTeacherById = createAsyncThunk<Teacher, number>(
  'teachers/fetchTeacherById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

//  Create teacher
export const createTeacher = createAsyncThunk<Teacher, Omit<Teacher, 'id'>>(
  'teachers/createTeacher',
  async (newTeacher) => {
    const response = await axios.post(API_URL, newTeacher);
    return response.data;
  }
);

//  Delete teacher
export const deleteTeacher = createAsyncThunk<number, number>(
  'teachers/deleteTeacher',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

//  Update teacher
export const updateTeacher = createAsyncThunk<Teacher, Teacher>(
  'teachers/updateTeacher',
  async (updatedTeacher) => {
    const response = await axios.put(`${API_URL}/${updatedTeacher.id}`, updatedTeacher);
    return response.data;
  }
);

//  Slice
const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearMessages(state) {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teachers';
      })

      //  Fetch One
      .addCase(fetchTeacherById.pending, (state) => {
        state.loading = true;
        state.singleTeacher = null;
        state.error = null;
      })
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTeacher = action.payload;
      })
      .addCase(fetchTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teacher';
      })

      //  Create
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.successMessage = "Teacher added successfully";
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create teacher';
      })

      //  Delete
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete teacher';
      })

      //  Update
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.successMessage = "Teacher updated successfully";
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update teacher';
      });
  },
});

//  Export actions and reducer
export const { clearMessages } = teacherSlice.actions;
export default teacherSlice.reducer;
