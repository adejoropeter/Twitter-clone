import { createSlice } from "@reduxjs/toolkit";
export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    //   loading state goes here
    userUrlName: "",
    tweet: [
      {
        id: 0,
        profileName: "Adejoro Peter ",
        text: "lorem ipsum",
        comment: [
          {
            profileName: "Adejoro Samson",
            text: "I Hate you",
            showDlt: false,
          },
        ],
        retweeted: false,
      },
      {
        id: 1,
        profileName: "Peter Samson",
        text: "Drop a comment on what u currently learing",
        retweeted: true,
        comment: [
          {
            showDlt: false,
            profileName: "Peter Samson",
            text: "I love you",
          },
        ],
      },
      {
        id: 2,
        retweeted: false,
        profileName: "Adejoro Joshua",
        text: "lorem ipsum",
        comment: [
          {
            showDlt: false,
            profileName: "Adejoro Joshua",
            text: "I Dislike you",
          },
        ],
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
                  showDlt: false,
                  id: action.payload.cmtId,
                },
              ],
            }
          : twt;
      });
    },
    setShowDlt: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: twt.comment.map((cmt) => {
                return cmt.id === action.payload.cmtId
                  ? { ...cmt, showDlt: !cmt.showDlt }
                  : cmt;
              }),
            }
          : twt;
      });
    },

    deleteComment: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: twt.comment.filter((cmt) => {
                return cmt.id !== action.payload.cmtId;
              }),
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
  setShowDlt,
  deleteComment
} = tweetSlice.actions;
export default tweetSlice.reducer;
