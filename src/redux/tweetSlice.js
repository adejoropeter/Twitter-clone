import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    //   loading state goes here
    userUrlName: "",
    tweet: [
      { profileName: "Adejoro Peter sks djdjdjdjjdjjdj", text: "lorem ipsum" },
      { profileName: "Peter Samson", text: "lorem ipsum" },
      { profileName: "Adejoro Joshua", text: "lorem ipsum" },
    ],
    viewTweet: null,
    showTweet: false,
  },
  reducers: {
    addToTweetArr: (state, action) => {
      state.tweet = [...state.tweet, { ...action.payload }];
    },
    // addToTweetArr: (state, action) => {
    //   state.tweet = action.payload;
    // },
    setUserUrlName: (state, action) => {
      state.userUrlName = action.payload;
    },
    viewTweet: (state, action) => {
      state.viewTweet = action.payload;
    },
  },
});
export const { addToTweetArr, viewTweet, setUserUrlName } = tweetSlice.actions;
export default tweetSlice.reducer;
