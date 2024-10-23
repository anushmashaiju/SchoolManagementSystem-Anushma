import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice'; 
import feeReducer from './feeSlice';
import libraryReducer from './librarySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer, 
    fees: feeReducer,
    library: libraryReducer,
  },
});

export default store;
