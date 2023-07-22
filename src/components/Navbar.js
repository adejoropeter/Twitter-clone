import React, { useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import {
  RiHome7Fill,
  RiHome7Line,
  RiSettings3Fill,
  RiSettings3Line,
} from "react-icons/ri";
import { FaBell, FaHashtag, FaTwitterSquare } from "react-icons/fa";
import { BiBell, BiHash, BiHome, BiNotification } from "react-icons/bi";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, showButton } from "../redux/LoginSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Navbar = () => {
  const [state, setState] = useState("");
  const currentUser = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleButton = useSelector((state) => state.login.showLogoutButton);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // localStorage.removeItem("user");
      dispatch(logout());
      navigate("/explore");
      // window.location.reload()
      dispatch(showButton());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-black   h-screen sticky -left-28  top-0  w-[20%] sm:w-[17%]  sm:flex flex-col items-end pr-2 py-4 overflow-scroll text-[#D6D9DB] gap-4  hidden  overflow-x-hidden">
        {/* <div className="fixed h-full overflow-scroll"> */}
        {/* <div className="ml- w-2/5"> */}

        {/* </div> */}
          <div className="flex  h-full  overflow- flex-col gap-2 ">
            <div className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer mb-6 ">
              <NavLink to="/foryou">
                <AiOutlineTwitter size={"38px"} />
              </NavLink>
            </div>
            {currentUser && (
              <NavLink
                to="/foryou"
                className={({ isActive }) => isActive ? setState("home"):""}
              >
                <abbr
                  title="Home"
                  className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
                >
                  {state === "home" ? (
                    <RiHome7Fill size={"30px"} />
                  ) : (
                    <RiHome7Line size={"30px"} />
                  )}
                </abbr>
              </NavLink>
            )}

            <NavLink
              to="/explore"
              className={({ isActive }) => isActive ?setState("explore"):""}
            >
              <abbr
                title="Explore"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                {state === "explore" ? (
                  <FaHashtag size={"30px"} />
                ) : (
                  <BiHash size={"30px"} />
                )}
              </abbr>
            </NavLink>
            {currentUser && (
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive ? setState("notifications"):""
                }
              >
                <abbr
                  title="Notifications"
                  className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
                >
                  {state === "notifications" ? (
                    <FaBell size={"30px"} />
                  ) : (
                    <BiBell size={"30px"} />
                  )}
                </abbr>
              </NavLink>
            )}
            {currentUser ? (
              <NavLink
                to="/messages"
                className={({ isActive }) => isActive ? setState("messages"):""}
              >
                <abbr
                  title="Messages"
                  className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
                >
                  {state === "messages" ? (
                    <MdEmail size={"30px"} />
                  ) : (
                    <MdOutlineEmail size={"32px"} />
                  )}
                </abbr>
              </NavLink>
            ) : null}
            {currentUser && (
              <abbr
                title="Twitter Blue"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                <FaTwitterSquare size={"30px"} />
              </abbr>
            )}
            {currentUser && (
              <abbr
                title="Profile"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                <HiOutlineUser size={"30px"} />
              </abbr>
            )}
            <NavLink
              to="/settings"
              className={({ isActive }) => isActive ? setState("settings"):""}
            >
              <abbr
                title="Notifications"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                {state === "settings" ? (
                  <RiSettings3Fill size={"30px"} />
                ) : (
                  <RiSettings3Line size={"30px"} />
                )}
              </abbr>
            </NavLink>
          {currentUser && (
            <div className="w-full flex items-end flex-col relative">
              {/* <div className="bg-green-400 w-10 cursor-pointer absolute">Hello</div> */}
              {toggleButton ? (
                <div className="w-fit h-fit p-2  bg-[#000000] rounded-lg shadow-[0px_0px_10px_3px] shadow-white">
                  <h3
                    onClick={handleLogout}
                    className="text-white hover:bg-[#16181C] cursor-pointer flex justify-center bg-black w-full "
                  >
                    Log out {"kkks"}
                  </h3>
                </div>
              ) : null}
              <div
                onClick={() => {
                  dispatch(showButton());
                }}
                className="  rounded-[50%] w-[60px] flex justify-center items-center h-[60px] hover:bg-[#16181C] cursor-pointer"
              >
                <img
                  src={"/assets/image.png"}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full cursor-pointer"
                />
              </div>
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
