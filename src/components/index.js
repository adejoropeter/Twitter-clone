import { lazy } from "react";

export { default as Navbar } from "./Navbar";
export { default as UploadTweet } from "./UploadTweet";
export { default as Tweet } from "./Tweet";
export const Following = lazy(() => import("../pages/home/Following"));
export const ForYou = lazy(() => import("../pages/home/ForYou"));
export const Message = lazy(() => import("../pages/message/Message"));
export const Notification = lazy(() =>
  import("../pages/notifikation/Notification")
);
export const Explore = lazy(() => import("../pages/explore/Explore"));
export const TwitterBlue = lazy(() =>
  import("../pages/twitter_blue/TwitterBlue")
);
export const Home = lazy(() => import("../pages/home/Home"));
export const Login = lazy(() => import("../pages/login/Login"));
