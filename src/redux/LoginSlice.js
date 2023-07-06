// import { createSlice } from "@reduxjs/toolkit";

// export const loginSlice = createSlice({
//   name: "login",
//   initialState: {
//     currentUser: JSON.parse(localStorage.getItem("user")),
//     currIdx: 0,
//     loginDetails: [
//       {
//         value: "",
//         cdesription: "Sign In to Twitter",
//         id: 0,
//         label: "Email",
//       },
//       {
//         value: "",
//         description: "Enter your password",
//         id: 1,
//         label: "Password",
//       },
//     ],
//   },
//   reducers: {
//     loginAction: (state) => {
//       if (state.currIdx >= 1) {
//         state.currIdx = 1;
//       } else {
//         state.currIdx = state.currIdx + 1;
//       }
//     },
//     changeVal: (state, action) => {
//       state.loginDetails = state.loginDetails.map((a) => {
//         return a.id === state.currIdx ? { ...a, value: action.payload } : a;
//       });
//     },
//     clearLoginInputField: (state) => {
//       state.loginDetails = [
//         {
//           value: "",
//           id: 0,
//           type: "text",
//           description: "Sign In to Twitter",
//           label: "Email",
//         },
//         {
//           value: "",
//           type: "password",
//           description: "Enter your password",
//           id: 0,
//           label: "Password",
//         },
//       ];
//     },
//     resetCurr: (state) => {
//       state.currIdx = 0;
//     },
//     login: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//     },
//   },
// });

// export const {
//   loginAction,
//   changeVal,
//   resetCurr,
//   clearLoginInputField,
//   login,
//   logout,
// } = loginSlice.actions;
// export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")),
    currIdx: 0,
    showLogoutButton: false,
    loginDetails: [
      {
        value: "",
        id: 0,
        label: "Email",
        type: "text",
        description: "Sign In to Twitter",
      },
      {
        value: "",
        id: 1,
        label: "Password",
        type: "text",
        description: "Enter your password",
      },
    ],
  },
  reducers: {
    loginAction: (state) => {
      if (state.currIdx >= 1) {
        state.currIdx = 1;
      } else {
        state.currIdx = state.currIdx + 1;
      }
    },
    changeVal: (state, action) => {
      state.loginDetails = state.loginDetails.map((a, i) => {
        return a.id === state.currIdx ? { ...a, value: action.payload } : a;
      });
    },
    clearLoginInputField: (state) => {
      state.loginDetails = [
        {
          value: "",
          id: 0,
          label: "Email",
          type: "text",
          description: "Sign In to Twitter",
        },
        {
          value: "",
          id: 1,
          label: "Password",
          type: "text",
          description: "Enter your password",
        },
      ];
    },
    resetCurr: (state) => {
      state.currIdx = 0;
    },
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    showButton: (state) => {
      state.showLogoutButton = !state.showLogoutButton;
    },
  },
});

export const {
  resetCurr,
  changeVal,
  loginAction,
  clearLoginInputField,
  login,
  logout,
  showButton
} = loginSlice.actions;
export default loginSlice.reducer;
