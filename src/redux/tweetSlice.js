import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    //   loading state goes here
    tweet: [
      { name: "Adejoro Peter sks djdjdjdjjdjjdj", text: "lorem ipsum" },
      { name: "Peter Samson", text: "lorem ipsum" },
      ,
      { name: "Adejoro Joshua", text: "lorem ipsum" },
    ],
  },
  reducers: {
    // addToTweetArr: (state, action) => {
    //   state.tweet = [...state.tweet, { ...action.payload }];
    // },
    addToTweetArr: (state, action) => {
      state.tweet = action.payload;
    },
  },
});
export const { addToTweetArr } = tweetSlice.actions;
export default tweetSlice.reducer;
