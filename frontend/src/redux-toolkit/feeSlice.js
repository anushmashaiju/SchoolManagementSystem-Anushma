import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Async thunk for fetching fees
export const fetchFees = createAsyncThunk('fees/fetchFees', async () => {
    const response = await axios.get(`${API_URL}/fees/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
});

// Async thunk for adding a fee
export const addFee = createAsyncThunk('fees/addFee', async (feeEntry) => {
    try {
        console.log('Sending Fee Entry:', feeEntry);
        const response = await axios.post(`${API_URL}/fees`, feeEntry, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Response from server:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error adding fee:', error.response ? error.response.data : error);
        throw error; // Ensure error is thrown for proper rejection handling
    }
});

// Async thunk for fetching a student by admission number
export const fetchStudentByAdmissionNo = createAsyncThunk('fees/fetchStudentByAdmissionNo', async (admissionNo) => {
    const response = await axios.get(`${API_URL}/student/admission/${admissionNo}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const student = response.data;

    if (!student._id) {
        throw new Error('Student not found');
    }
    return student; 
});

// Async thunk for deleting a fee
export const deleteFee = createAsyncThunk('fees/deleteFee', async (id) => {
    await axios.delete(`${API_URL}/fees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return id;
});

// Async thunk for updating a fee
export const updateFeesHistory = createAsyncThunk('fees/updateFeesHistory', async ({ id, updatedRecord }) => {
    const response = await axios.put(`${API_URL}/fees/${id}`, updatedRecord, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
});

// Create fees slice
const feesSlice = createSlice({
    name: 'fees',
    initialState: {
        fees: [],
        student: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null; // Add a reducer to clear errors
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchFees
            .addCase(fetchFees.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(fetchFees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fees = action.payload;
            })
            .addCase(fetchFees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message; // Capture error message
            })
            // Handle addFee
            .addCase(addFee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addFee.fulfilled, (state, action) => {
                state.fees.push(action.payload); // Add the new fee to the fees array
                state.isLoading = false;
                state.error = null; // Reset error
            })
            .addCase(addFee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message; // Capture error message
                console.error('Failed to add fee:', action.error);
            })
            // Handle fetchStudentByAdmissionNo
            .addCase(fetchStudentByAdmissionNo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchStudentByAdmissionNo.fulfilled, (state, action) => {
                state.student = action.payload; // Save fetched student
                state.isLoading = false;
                state.error = null; // Reset error
            })
            .addCase(fetchStudentByAdmissionNo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message; // Capture error message
            })
            // Handle deleteFee
            .addCase(deleteFee.fulfilled, (state, action) => {
                state.fees = state.fees.filter(fee => fee._id !== action.payload); // Remove deleted fee
            })
            // Handle updateFeesHistory
            .addCase(updateFeesHistory.fulfilled, (state, action) => {
                const index = state.fees.findIndex(fee => fee._id === action.payload._id);
                if (index !== -1) {
                    state.fees[index] = action.payload; // Update existing fee
                }
            });
    },
});

export const { clearError } = feesSlice.actions; // Export the clearError action
export default feesSlice.reducer;
