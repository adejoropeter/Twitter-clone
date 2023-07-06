import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    currIdx: 0,
    signupDetails: [
      { id: 0, name: "", email: "", imageUrl: "" },
      { id: 1 },
      { password: "", id: 2 },
    ],
  },
  reducers: {
    incrementAction: (state) => {
      if (state.currIdx >= 2) {
        state.currIdx = 2;
      } else {
        state.currIdx = state.currIdx + 1;
      }
    },
    decrementAction: (state) => {
      if (state.currIdx <= 0) {
        state.currIdx = 0;
      } else {
        state.currIdx = state.currIdx - 1;
      }
    },
    changeNameVal: (state, action) => {
      state.signupDetails = state.signupDetails.map((a, i) => {
        return a.id === 0
          ? { ...a, name: action.payload }
          : a.id === 1
          ? {
              ...a,
              name: action.payload,
            }
          : a.id === 2
          ? {
              ...a,
              password: "",
            }
          : a;
      });
    },
    changeImageUrl: (state, action) => {
      state.signupDetails = state.signupDetails.map((a, i) => {
        return a.id === 0
          ? { ...a, imageUrl: action.payload }
          : a.id === 1
          ? {
              ...a,
              imageUrl: action.payload,
            }
          : a.id === 2
          ? {
              ...a,
              password: "",
            }
          : a;
      });
    },
    changePassWordVal: (state, action) => {
      state.signupDetails = state.signupDetails.map((a, i) => {
        return a.id === 2 ? { ...a, password: action.payload } : a;
      });
    },
    changeEmailVal: (state, action) => {
      state.signupDetails = state.signupDetails.map((a, i) => {
        return a.id === 0
          ? { ...a, email: action.payload }
          : a.id === 1
          ? {
              ...a,
              email: action.payload,
            }
          : a.id === 2
          ? {
              ...a,
              password: "",
            }
          : a;
      });
    },
    clearSignupInputField: (state) => {
      state.signupDetails = [
        { name: "", email: "", id: 0 },
        { id: 1 },
        { password: "", id: 2 },
      ];
    },
    resetCurr: (state) => {
      state.currIdx = 0;
    },
  },
});

export const {
  resetCurr,
  changeEmailVal,
  changeNameVal,
  incrementAction,
  decrementAction,
  clearSignupInputField,
  changePassWordVal,
  changeImageUrl,
} = signupSlice.actions;
export default signupSlice.reducer;
