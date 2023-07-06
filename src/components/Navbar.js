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
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showButton } from "../redux/LoginSlice";
const Navbar = () => {
  const [state, setState] = useState("");
  const currentUser = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-black   h-screen sticky -left-28  top-0  w-[20%] sm:w-[17%]  sm:flex flex-col items-end pr-6 py-4 text-[#D6D9DB] gap-4  hidden ">
        <div className="fixed h-full ">
          <div className="ml-4 w-2/5">
            <div className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer mb-6 ">
              <NavLink to="/foryou">
                <AiOutlineTwitter size={"38px"} />
              </NavLink>
            </div>
          </div>
          <div className="flex  h-full  overflow- flex-col gap-2 absolute right-0">
            {currentUser ? (
              <NavLink
                to="/foryou"
                className={({ isActive }) => isActive && setState("home")}
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
            ) : null}

            <NavLink
              to="/explore"
              className={({ isActive }) => isActive && setState("explore")}
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
            {currentUser ? (
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive && setState("notifications")
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
            ) : null}
            {currentUser ? (
              <NavLink
                to="/messages"
                className={({ isActive }) => isActive && setState("messages")}
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
            {currentUser ? (
              <abbr
                title="Twitter Blue"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                <FaTwitterSquare size={"30px"} />
              </abbr>
            ) : null}
            {currentUser ? (
              <abbr
                title="Profile"
                className="rounded-full w-[50px] flex justify-center items-center h-[50px] hover:bg-[#16181C] cursor-pointer"
              >
                <HiOutlineUser size={"30px"} />
              </abbr>
            ) : null}
            <NavLink
              to="/settings"
              className={({ isActive }) => isActive && setState("settings")}
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
          </div>
          <div className="  h-[calc(100%_-_15%)] flex items-end flex-col justify-end">
            <div className="bg-green-400 w-10 cursor-pointer"></div>
            <div
              onClick={() => {
                dispatch(showButton());
              }}
              className="  w-[60px] h-[60px] hover:bg-[#16181C] rounded-full flex justify-center items-center  cursor-pointer"
            >
              <img
                src={"/assets/image.png"}
                alt=""
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
