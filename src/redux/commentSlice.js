import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment_input_field",
  initialState: {
    value: [],
    bool: false,
  },
  reducers: {
    stateValue: (state, action) => {
      state.value = action.payload;
    },
    showIcons: (state, action) => {
      state.bool = action.payload;
    },
    clearCommentInputField: (state) => {
      state.value = "";
    },
  },
});

export const { stateValue, showIcons, clearCommentInputField } =
  commentSlice.actions;
export default commentSlice.reducer;
