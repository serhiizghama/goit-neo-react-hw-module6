import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    }
  },
  selectors: {
    selectNameFilter: (state) => state.name
  }
});

export const { changeFilter } = slice.actions;
export const { selectNameFilter } = slice.selectors;

export default slice.reducer;
