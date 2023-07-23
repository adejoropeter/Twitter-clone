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
        showTweetDlt: false,
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
        showTweetDlt: false,

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
        text: "Peter",
        showTweetDlt: false,

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
      // state.tweet=state.tweet.reverse()
      state.tweet = [{ ...action.payload }, ...state.tweet];
    },
    reverseTweetArr: (state) => {
      state.tweet = state.tweet.reverse();
    },
    setUserUrlName: (state, action) => {
      state.userUrlName = action.payload;
    },
    viewTweet: (state, action) => {
      state.viewTweet = action.payload;
    },
    setAddComment: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
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
    setAddComposedComment2: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: [
                ...twt.comment,
                {
                  ...action.payload.firstComment,
                  text: action.payload.firstCommentText,
                  profileName: action.payload.firstCommentProfileName,
                  cmtId: action.payload.firstCommentCmtId,
                },
                {
                  ...action.payload.secondComment,
                  text: action.payload.secondCommentText,
                  profileName: action.payload.secondCommentProfileName,
                  cmtId: action.payload.secondCommentCmtId,
                },
              ],
            }
          : twt;
      });
    },
    setAddComposedComment3: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: [
                ...twt.comment,
                {
                  ...action.payload.firstComment,
                  text: action.payload.firstCommentText,
                  profileName: action.payload.firstCommentProfileName,
                  cmtId: action.payload.firstCommentCmtId,
                },
                {
                  ...action.payload.secondComment,
                  text: action.payload.secondCommentText,
                  profileName: action.payload.secondCommentProfileName,
                  cmtId: action.payload.secondCommentCmtId,
                },
                {
                  ...action.payload.thirdComment,
                  text: action.payload.thirdCommentText,
                  profileName: action.payload.thirdCommentProfileName,
                  cmtId: action.payload.thirdCommentCmtId,
                },
              ],
            }
          : twt;
      });
    },
    setShowCommentDlt: (state, action) => {
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
    setShowTweetDlt: (state, action) => {
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? { ...twt, showTweetDlt: !twt.showTweetDlt }
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

    deleteTweet: (state, action) => {
      state.tweet = state.tweet.filter((twt) => twt.id !== action.payload.id);
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
  setShowCommentDlt,
  setShowTweetDlt,
  deleteTweet,
  reverseTweetArr,
  deleteComment,
  setAddComposedComment2,
  setAddComposedComment3,
} = tweetSlice.actions;
export default tweetSlice.reducer;
