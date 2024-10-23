import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Thunks for asynchronous actions like fetching, adding, updating, and deleting students
export const fetchStudents = createAsyncThunk('students/fetchStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/student`);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Fetch individual student details
export const fetchStudentDetails = createAsyncThunk('students/fetchStudentDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/student/details/${id}`);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Update addStudent to include the token in the headers
export const addStudent = createAsyncThunk('students/addStudent', async (studentData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');   
    const response = await axios.post(`${API_URL}/add-student`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/student/${id}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => { 
  await axios.delete(`${API_URL}/student/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`} 
    });
    return id; 
});

// Create the student slice
const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    studentDetails: null, 
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching students
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload; 
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })
      // Handle fetching individual student details
      .addCase(fetchStudentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentDetails = action.payload; 
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle adding a student
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.push(action.payload.student);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      })
      // Handle updating a student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      // Handle deleting a student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student._id !== action.payload); // Remove the deleted student
      });
  },
});

export default studentSlice.reducer;
