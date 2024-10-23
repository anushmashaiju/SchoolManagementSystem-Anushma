import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Thunks for asynchronous operations
export const fetchLibraryHistory = createAsyncThunk(
  'library/fetchLibraryHistory',
  async () => {
    const response = await axios.get(`${API_URL}/library/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Include the token
    });
    console.log('Fetched Library Response:', response.data); // Log the response data
    return response.data; // Assuming response.data contains the library history
  }
);

export const addLibraryRecord = createAsyncThunk(
  'library/addLibraryRecord',
  async (newRecord, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/library`, newRecord, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data.newLibraryHistory; // Ensure correct data is returned
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add library record');
    }
  }
);

export const updateLibraryRecord = createAsyncThunk(
  'library/updateLibraryRecord',
  async ({ id, updatedRecord }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/library/${id}`, updatedRecord, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update library record');
    }
  }
);

export const deleteLibraryRecord = createAsyncThunk(
  'library/deleteLibraryRecord',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/library/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return id; // Return the deleted record ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete library record');
    }
  }
);

// Thunk to fetch student data by admission number
export const fetchStudentByAdmissionNo = createAsyncThunk(
  'library/fetchStudentByAdmissionNo',
  async (admissionNo, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/student/admission/${admissionNo}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch student data');
    }
  }
);

// Slice
const librarySlice = createSlice({
  name: 'library',
  initialState: {
    bookHistory: [],
    student: null, // Include student data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Library History
      .addCase(fetchLibraryHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibraryHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory = action.payload;
      })
      .addCase(fetchLibraryHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Use error.message for rejected cases
      })
      
      // Add Library Record
      .addCase(addLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory.push(action.payload);
      })
      .addCase(addLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Update Library Record
      .addCase(updateLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookHistory.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) {
          state.bookHistory[index] = action.payload;
        }
      })
      .addCase(updateLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Delete Library Record
      .addCase(deleteLibraryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLibraryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.bookHistory = state.bookHistory.filter(
          (record) => record._id !== action.payload // Filter by the deleted record's ID
        );
      })
      .addCase(deleteLibraryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch Student By Admission No
      .addCase(fetchStudentByAdmissionNo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentByAdmissionNo.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentByAdmissionNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default librarySlice.reducer;
