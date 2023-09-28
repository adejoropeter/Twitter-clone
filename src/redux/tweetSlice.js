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
    total: 0,
    showEdit: false,
    tweet: [
      {
        id: 2,
        profileName: "Ade Peter ",
        text: ["lorem ipsum"],
        isPinned: false,
        showTweetDlt: false,
        username: "@ade_peter",
        quote: [],
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
        text: ["Drop a comment on what u're currently learning"],
        retweeted: true,
        showTweetDlt: false,
        username: "@peter_sam",
        isPinned: true,
        quote: [],
        comment: [
          {
            showDlt: false,
            profileName: "Peter Samson",
            text: "I love you",
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
      state.tweet = [...action.payload, ...state.tweet].sort(
        (a, b) => b.isPinned - a.isPinned
      );
    },
    addToCopyTweetArr: (state, action) => {
      state.copyOfNewTweets = [...action.payload, ...state.copyOfNewTweets];
    },
    sortArr: (state) => {
      state.tweet = state.tweet?.sort((a, b) => b.isPinned - a.isPinned);
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
    setShowEdit: (state, action) => {
      state.showEdit = action.payload;
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
      const del = state.tweet.find((a) => {
        return a?.id === state.viewTweet?.quoteTweet?.id;
      });
      if (del) {
        const res = state.tweet[state.tweet.indexOf(del)]?.quote.filter((a) => {
          return a.id !== action.payload.id;
        });
        state.tweet = state.tweet.filter((twt) => twt.id !== action.payload.id);

        state.tweet = state.tweet.map((a) => {
          return a.id === del.id ? { ...a, quote: res } : a;
        });
        console.log(res);
        console.log(del);
      } else {
        state.tweet = state.tweet.filter((twt) => twt.id !== action.payload.id);
      }
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
      localStorage.setItem("pinned-tweet", JSON.stringify([findValue]));
      localStorage.setItem("pinned-prev-index", findIndex);
      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id
          ? { ...twt, isPinned: true }
          : { ...twt, isPinned: false };
      });
    },
    totalNumberOfTweetAddedAfterPinnedTweet: (state) => {
      state.total++;
    },
    clearTotalNumberOfTweetAddedAfterPinnedTweet: (state) => {
      state.total = 0;
    },
    changeIDIndex: (state) => {
      state.idIndex++;
    },
    changeIDIndexMinusOne: (state) => {
      state.idIndex--;
    },
    unPinTweet: (state, action) => {
      const findIndex = state.tweet.find((x) => x.id === action.payload.id);
      // const find = state.tweet.find((x) => x.isPinned === true);
      const value = JSON.parse(localStorage.getItem("pinned-tweet"));
      const got = Object.entries(value);

      const gt = got[0][1];

      // localStorage.removeItem("tweet-name")

      state.tweet = state.tweet.map((twt) => {
        return twt.id === action.payload.id ? { ...twt, isPinned: false } : twt;
      });

      state.tweet.splice(findIndex, 1);
      state.tweet.splice(
        localStorage.getItem("pinned-new-index") >
          localStorage.getItem("pinned-prev-index")
          ? Number(localStorage.getItem("pinned-new-index"))
          : Number(localStorage.getItem("pinned-prev-index")),
        0,
        // {
        //   text: "sjs",
        //   profileName: "Adp",
        //   comment: [{ text: "kkd" }],
        //   isThread: true,
        // }
        value[0]
      );
    },
    editTweet: (state, action) => {
      state.tweet = state.tweet.map((a) => {
        return a.id === action.payload.id
          ? { ...a, text: action.payload.text }
          : a;
      });
    },
    editOnce: (state, action) => {
      state.tweet = state.tweet.map(
        (a) => (a.id === action.payload.id ? { ...a, isEdit: true } : a)
        // a.id===action.payload ?  a.text===action.payload.text?{...a,isEdit:true}:a
      );
      const find = state.tweet.find((a) => {
        return a?.quoteTweet?.id === Number(localStorage.getItem("editID"));
      });
      if (find) {
        state.tweet = state.tweet.map((a) => {
          return a.id === find.id
            ? {
                ...a,
                quoteTweet: { ...a.quoteTweet, text: action.payload.text },
              }
            : a;
        });
      }
      console.log(find);
    },
    findQuoteTweet4Each: (state, action) => {
      state.tweet = state.tweet?.map((twt) => {
        return twt.id === action.payload.id
          ? {
              ...twt,
              quote: [
                {
                  // id: action.payload.qutID,
                  // text: action.payload.text,
                  ...action.payload.tweet,
                },
                ...twt.quote,
              ],
            }
          : twt;
      });
    },
    quote: (state, action) => {
      // const findAll = tweets?.find(a => a.quoteTweet.id === 2)
      // const findIfPinnedTweetExist = state.tweet.find((a) => {
      //   return a?.quoteTweet?.id === action.payload.id;
      // });
      // console.log(findIfPinnedTweetExist)
      state.tweet = state.tweet?.map((twt) => {
        return twt.id === action.payload?.id
          ? {
              ...twt,
              quote: [{ ...action.payload.obj }, ...twt.quote],
            }
          : twt;
      });
    },
  },
});
export const {
  addToTweetArr,
  quote,
  findQuoteTweet4Each,
  editOnce,
  editTweet,
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
  sortArr,
  clearTotalNumberOfTweetAddedAfterPinnedTweet,
  setShowEdit,
  totalNumberOfTweetAddedAfterPinnedTweet,
} = tweetSlice.actions;
export default tweetSlice.reducer;
