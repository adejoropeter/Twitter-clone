import { createSlice } from "@reduxjs/toolkit";

export const inputFieldSlice = createSlice({
  name: "input-field",
  initialState: {
    value: [],
    bool: false,
  },
  reducers: {
    stateValue: (state, action) => {
      state.value = action.payload;
    },
    showIcons: (state, action) => {
      state.bool = action.payload;
    },
    clearInputField: (state) => {
      state.value = [];
    },
  },
});

export const { stateValue, showIcons ,clearInputField} = inputFieldSlice.actions;
export default inputFieldSlice.reducer;
