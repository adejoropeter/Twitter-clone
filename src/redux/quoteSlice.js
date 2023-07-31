import { createSlice } from "@reduxjs/toolkit";
export const quoteSlice = createSlice({
  name: "input-field",
  initialState: {
    inputVal: "",
    quoteTweet: {},
  },
  reducers: {
    addToTweetArray: (state, action) => {
      state.quoteTweet = action.payload.object;
      state.inputVal = action.payload.value;
    },
    clearInputVal: (state) => {
      state.inputVal = "";
    },
  },
});
export const { addToTweetArray ,clearInputVal} = quoteSlice.actions;
export default quoteSlice.reducer;
