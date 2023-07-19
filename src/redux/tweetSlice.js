import { createSlice } from "@reduxjs/toolkit";
export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    //   loading state goes here
    userUrlName: "",
    tweet: [
      {
        id: 0,
        profileName: "Adejoro Peter sks djdjdjdjjdjjdj",
        text: "lorem ipsum",
        comment: [{ profileName: "Adejoro Samson", text: "I Hate you" }],
        retweeted: false,
      },
      {
        id: 1,
        profileName: "Peter Samson",
        text: "lorem ipsum",
        retweeted: true,
        comment: [{ profileName: "Peter Samson", text: "I love you" }],
      },
      {
        id: 2,
        retweeted: false,
        profileName: "Adejoro Joshua",
        text: "lorem ipsum",
        comment: [{ profileName: "Adejoro Joshua", text: "I Dislike you" }],
      },
    ],
    retweetedTweet: [],
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
    setAddComment: (state, action) => {
      state.tweet = state.tweet.map((twt, id) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: [
                ...twt.comment,
                {
                  profileName: action.payload.profileName,
                  text: action.payload.text,
                },
              ],
            }
          : twt;
      });
    },
    setRetweet: (state, action) => {
      state.tweet = state.tweet.map((twt, id) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              retweeted: !twt.retweeted,
            }
          : twt;
      });
    },
    setAddToRetweetArr: (state) => {
      state.retweetedTweet = state.tweet.filter(
        (twt) => twt.retweeted !== false
      );
    },
  },
});
export const {
  addToTweetArr,
  setRetweet,
  viewTweet,
  setUserUrlName,
  setAddComment,
  setAddToRetweetArr,
} = tweetSlice.actions;
export default tweetSlice.reducer;
