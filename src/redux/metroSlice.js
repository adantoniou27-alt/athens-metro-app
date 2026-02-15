import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stations: [],
  lines: [],
  loading: false,
  error: null,
};

const metroSlice = createSlice({
  name: 'metro',
  initialState,
  reducers: {
    setStations: (state, action) => {
      state.stations = action.payload;
    },
    setLines: (state, action) => {
      state.lines = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addStation: (state, action) => {
      state.stations.push(action.payload);
    },
    updateStation: (state, action) => {
      const index = state.stations.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.stations[index] = action.payload;
      }
    },
  },
});

export const { setStations, setLines, setLoading, setError, addStation, updateStation } = metroSlice.actions;
export default metroSlice.reducer;