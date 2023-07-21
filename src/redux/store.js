import { configureStore } from "@reduxjs/toolkit";
import inputFieldSlice from "./inputFieldSlice";
// import
import tweetReducer from "./tweetSlice";
import loginDetails from "./LoginSlice";
import signupSlice from "./signupSlice";
import userSlice from "./userSlice";
import commentSlice from "./commentSlice";
import composeSlice from "./composeSlice";
export default configureStore({
  reducer: {
    post: tweetReducer,
    input: inputFieldSlice,
    login: loginDetails,
    signup: signupSlice,
    user: userSlice,
    comment: commentSlice,
    composeTweet: composeSlice,
  },
});
