import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { TbX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { login } from "../../redux/LoginSlice";
import {
  changeEmailVal,
  changeNameVal,
  changeVal,
  decrementAction,
  incrementAction,
  resetCurr,
  signupAction,
} from "../../redux/signupSlice";
import LoginButton from "../login/LoginButton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SignupSteps from "./SignupSteps";
import { add_user_img } from "../../redux/userSlice";
const Signup = () => {
  const inputDetail = useSelector((state) => state.signup.signupDetails);
  const currIdx = useSelector((state) => state.signup.currIdx);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  //   const handleInputChange = (event) => {
  //     dispatch(changeNameVal(event.target.value));
  // console.log(user)  };
  //   const handleEmailChange = (event) => {
  //     dispatch(changeEmailVal(event.target.value));
  //     console.log(user)
  //   };

  useEffect(() => {
    const uploadFile = () => {
      const file = new Date().getTime() + inputDetail[0].imageUrl;
      const storageRef = ref(storage, file);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          // console.log(Number(progress))
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              setStatus(0);
              break;
            case "running":
              setStatus(100);
              console.log("Upload is running");
              console.log(user);
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setUser({ ...user, photoUrl: downloadURL });
          });
        }
      );
    };
    inputDetail[0]?.imageUrl && uploadFile();
  }, [inputDetail[0].imageUrl]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  const navigate = useNavigate();
  //   const signInWithGoogle = () => {
  //     navigate("/login");

  //
  //   };
  const GoToNext = () => {
    if (
      !inputDetail[0]?.name ||
      !inputDetail[0]?.email ||
      inputDetail[0]?.name.includes("twitter") ||
      !inputDetail[0]?.email.includes("@") ||
      status < 100
    ) {
      return;
    }
    dispatch(incrementAction());
  };
  const GoToLast = () => {
    dispatch(incrementAction());
  };
  const GoToPrevious = () => {
    dispatch(decrementAction());
  };
  const handleSubmit = async () => {
    const email = inputDetail[0]?.email;
    const displayName = inputDetail[0]?.name;
    const password = inputDetail[2]?.password;
    setUser({ ...user, name: displayName });
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      dispatch(login(res));
      await setDoc(doc(db, "users", res.user.uid), user);
      setLoading(false);
      navigate("/foryou");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#242d34b3] fixed z-50 overflow-y-hidden">
      <div className="bg-black  w-[600px]  h-fit  top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%] flex flex-col rounded-2xl overflow-hidden relative ">
        <div className="flex items-center py-2 px-4">
          <div className="flex-1 flex items-center ">
            <abbr
              title="close"
              className=" w-10 h-10 transition-colors duration-200 hover:bg-[#181919] delay-100 rounded-full flex justify-center items-center"
            >
              {currIdx > 0 ? (
                <BsArrowLeft
                  size="20px"
                  className="text-white   self-center cursor-pointer"
                  onClick={GoToPrevious}
                />
              ) : (
                <TbX
                  size="20px"
                  className="text-white   self-center cursor-pointer"
                  onClick={() => {
                    navigate("/foryou");
                    dispatch(resetCurr());
                    document.body.style.overflow = "visible";
                  }}
                />
              )}
            </abbr>
            <p className="text-white font-bold text-lg ml-3">
              Step {currIdx + 1} / {inputDetail.length}
            </p>
          </div>
          <div className="flex-1 ">
            <AiOutlineTwitter size={"45px"} className="flex-1 text-white" />
          </div>
        </div>
        <div className="overflow-scroll overflow-x-hidden w-full h-[450px] py-10">
          <div className="w-[400px] flex flex-col items-center justify-center m-[0_auto] gap-8">
            <h1 className="text-3xl font-bold text-white">
              Create your account
            </h1>

            <div className="relative w-full flex flex-col gap-4 mb-2">
              <div className="relative w-full mb-4">
                <SignupSteps user={ user} />
              </div>
              <LoginButton
                handleClickEvent={
                  currIdx === 0
                    ? GoToNext
                    : currIdx === 1
                    ? GoToLast
                    : handleSubmit
                }
                text={
                  currIdx === 2
                    ? !loading
                      ? "Continue"
                      : "loading"
                    : currIdx === 1
                    ? "Go To Last"
                    : "Next"
                }
                textColor="black"
                space={"10px"}
                disabled={
                  !inputDetail[0]?.name ||
                  !inputDetail[0]?.email ||
                  inputDetail[0]?.name.includes("twitter") ||
                  !inputDetail[0]?.name.includes(" ") ||
                  !inputDetail[0]?.email.includes("@") ||
                  inputDetail[0]?.email.includes("twitter") ||
                  status < 100
                }
              />
            </div>
            <div className="text-white flex gap-2">
              <span className="text-[#7C8087]">Already have an account?</span>
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-[#1D9BF0] cursor-pointer hover:underline"
              >
                {" "}
                Login{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="bg-[#1D9BF0]  absolute top-[%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white rounded-full w-fit h-10 flex justify-center items-center px-3">
        Must contain space,and a value and not include the word twitter
      </p>
    </div>
  );
};

export default Signup;
