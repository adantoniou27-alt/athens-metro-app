import { configureStore } from '@reduxjs/toolkit';
import metroReducer from './metroSlice';

const store = configureStore({
  reducer: {
    metro: metroReducer,
  },
});

export default store;