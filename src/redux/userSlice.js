import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_details: {
      name: "",
      profilePic: "",
    },
  },
  reducers: {
    add_user_name: (state, action) => {
      state.user_details = { ...state.user_details, name: action.payload};
    },
    add_user_img: (state, action) => {
      state.user_details = {
        ...state.user_details,
        profilePic: action.payload,
      };
    },
  },
});

export const { add_user_name, add_user_img } = userSlice.actions;
export default userSlice.reducer;
