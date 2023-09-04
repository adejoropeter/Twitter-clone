import { createSlice } from "@reduxjs/toolkit";
export const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    //   loading state goes here
    userUrlName: "",
    quote: null,
    showMsg: false,
    idIndex: 2,
    currIdx: 0,
    tweet: [
      {
        id: 2,
        profileName: "Ade Peter ",
        text: "lorem ipsum",
        isPinned: true,

        showTweetDlt: false,
        username: "@ade_peter",
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
        text: "Drop a comment on what u're currently learning",
        retweeted: true,
        showTweetDlt: false,
        username: "@peter_sam",
        isPinned: false,

        comment: [
          {
            showDlt: false,
            profileName: "Peter Samson",
            text: "I love you",
          },
        ],
      },
      {
        id: 0,
        retweeted: false,
        isPinned: false,
        profileName: "Adejoro Joshua",
        text: "Peter",
        showTweetDlt: false,
        username: "@josh_ade",
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
    copyOfNewTweets: [],
  },
  reducers: {
    getAllTweet: (state) => {
      state.tweet = state.tweet;
    },
    addToTweetArr: (state, action) => {
      state.tweet = [...action.payload, ...state.tweet];
      // state.idIndex++;
    },
    addToCopyTweetArr: (state, action) => {
      state.copyOfNewTweets = [...action.payload,...state.copyOfNewTweets ];
    },
    clearCopyTweetArr: (state) => {
      state.copyOfNewTweets = [];
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
      state.tweet = state.tweet?.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              comment: [
                {
                  profileName: action.payload.profileName,
                  text: action.payload.text,
                  showDlt: false,
                  id: action.payload.cmtId,
                },
                ...twt.comment,
              ],
            }
          : twt;
      });
    },
    setAddComposedComment2: (state, action) => {
      state.tweet = state.tweet?.map((twt) => {
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
      state.tweet = state.tweet?.map((twt) => {
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
      state.tweet = state.tweet?.map((twt) => {
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
      state.tweet = state.tweet?.map((twt) => {
        return twt.id === action.payload.id
          ? { ...twt, showTweetDlt: !twt.showTweetDlt }
          : { ...twt, showTweetDlt: false };
      });
    },

    deleteComment: (state, action) => {
      state.tweet = state.tweet?.map((twt) => {
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
      // SORT the objects up side down
      // state.tweet = state.tweet.map((a, i) => {
      //   return { ...a, id: i  };
      // });
    },

    setRetweet: (state, action) => {
      state.tweet = state.tweet?.map((twt, id) => {
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
    setShowMsg: (state, action) => {
      state.showMsg = action.payload;
    },
    pinTweet: (state, action) => {
      const findIndex = state.tweet.findIndex(
        (x) => x.id === action.payload.id
      );
      const findValue = state.tweet.find((x) => x.id === action.payload.id);
      if (findIndex === 0) {
        state.tweet = state.tweet.map((twt) => {
          return twt.id === action.payload.id
            ? { ...twt, isPinned: true }
            : { ...twt, isPinned: false };
        });
      } else {
        state.tweet.splice(findIndex, 1);
        // localStorage.setItem("pinned-tweet", JSON.stringify(findValue));
        state.tweet.unshift({ ...findValue, isPinned: true });
        state.tweet = state.tweet.map((twt) => {
          return twt.id === action.payload.id
            ? { ...twt, isPinned: true }
            : { ...twt, isPinned: false };
        });
      }
    },
    changeIDIndex: (state) => {
      state.idIndex++;
    },
    changeIDIndexMinusOne: (state) => {
      state.idIndex--;
    },
    unPinTweet: (state, action) => {
      const findIndex = state.tweet.findIndex(
        (x) => x.id === action.payload.id
      );
      if (findIndex === 0) {
        state.tweet = state.tweet.map((twt) => {
          return twt.id === action.payload.id
            ? { ...twt, isPinned: false }
            : twt;
        });
      } else {
        state.tweet.splice(findIndex, 1);
      }
    },
  },
});
export const {
  addToTweetArr,
  setRetweet,
  setShowMsg,
  viewTweet,
  setUserUrlName,
  setAddComment,
  setAddToRetweetArr,
  setShowCommentDlt,
  pinTweet,
  unPinTweet,
  setShowTweetDlt,
  deleteTweet,
  addToCopyTweetArr,
  clearCopyTweetArr,
  reverseTweetArr,
  deleteComment,
  setAddComposedComment2,
  getAllTweet,
  setAddComposedComment3,
  changeIDIndexMinusOne,
  changeIDIndex,
} = tweetSlice.actions;
export default tweetSlice.reducer;
