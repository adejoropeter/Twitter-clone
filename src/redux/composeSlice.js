import { createSlice } from "@reduxjs/toolkit";

const a = [1, 1, 1, 2];
// a[a.length-1]

export const composeSlice = createSlice({
  name: "input-field",
  initialState: {
    groupTweet: [],
    currIdx: 0,
  },
  reducers: {
    addToGrpTweet: (state, action) => {
      state.currIdx = state.currIdx + 1;
      state.groupTweet = [
        ...state.groupTweet,
        {
          ...action.payload,
        },
      ];
    },
    addToGrpTweetjks: (state, action) => {
      state.currIdx = state.currIdx + 1;
      state.groupTweet = [
        ...state.groupTweet,
        {
          ...action.payload.firstTweet,
        },
        {
          ...action.payload.secondTweet,
        },
      ];
    },
    onChange: (state, action) => {
      state.groupTweet = state.groupTweet.map((cmp) => {
        return cmp.id === state.currIdx
          ? { ...cmp, inputText: action.payload }
          : cmp;
      });
    },
    backGroundColor: (state) => {
      state.groupTweet = state.groupTweet.map((cmp) => {
        return cmp.id === state.currIdx
          ? { ...cmp, isFade: true }
          : { ...cmp, isFade: false };
      });
    },
    setCurrIdx: (state, action) => {
      state.currIdx = action.payload;
    },
    resetGroupTweet: (state) => {
      state.currIdx = 0;
      state.groupTweet = [];
    },
    setGroupTweetTo4: (state) => {
      state.groupTweet.length = 4;
    },
  },
});

export const {
  addToGrpTweet,
  resetGroupTweet,
  backGroundColor,
  onChange,
  setCurrIdx,
  setGroupTweetTo4,
  addToGrpTweetjks,
} = composeSlice.actions;
export default composeSlice.reducer;
