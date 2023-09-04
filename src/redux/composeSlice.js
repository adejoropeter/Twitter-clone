import { createSlice } from "@reduxjs/toolkit";

const a = [1, 1, 1, 2];
// a[a.length-1]

export const composeSlice = createSlice({
  name: "input-field",
  initialState: {
    groupTweet: [],
    copyOfGroupTweet: [],
    currIdx: 1,
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
    backGroundColor: (state, action) => {
      state.groupTweet = state.groupTweet.map((cmp) => {
        return cmp.id === state.currIdx
          ? { ...cmp, isFade: state.groupTweet.length > 1 ? true : false }
          : //     ? { ...cmp, isFade: true }
            { ...cmp, isFade: false };
      });
    },
    disableFirstObject: (state, action) => {
      state.copyOfGroupTweet = state.groupTweet?.filter((cmp) => {
        return cmp.id !== 0;
      });
    },
    setCurrIdx: (state, action) => {
      state.currIdx = action.payload;
    },
    resetGroupTweet: (state) => {
      state.currIdx = 1;
      state.groupTweet = [];
    },
    setGroupTweetTo4: (state) => {
      state.groupTweet.length = 4;
    },
    filterGroupTweet: (state, action) => {
      state.currIdx = state.groupTweet.length - 1;
      state.groupTweet = state.groupTweet?.filter((cmp) => {
        return cmp.id !== action.payload.id;
      });
      state.groupTweet = state.groupTweet.map((a, i) => {
        return { ...a, id: i + 1 };
      });
    },
  },
});
export const {
  addToGrpTweet,
  resetGroupTweet,
  backGroundColor,
  filterGroupTweet,
  onChange,
  setCurrIdx,
  setGroupTweetTo4,
  addToGrpTweetjks,
  disableFirstObject,
} = composeSlice.actions;
export default composeSlice.reducer;
