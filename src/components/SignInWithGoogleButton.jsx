import React from 'react'
import { FcGoogle } from 'react-icons/fc';

const SignInWithGoogleButton = ({onClick}) => {
  return (
    <div
      className="bg-white p-2 rounded-full hover:bg-[#D7DBDC] cursor-pointer duration-500 w-full h-fit flex items-center justify-center gap-4"
      onClick={onClick}
    >
      <FcGoogle size="24px" />
      <p className="text-black font-semibold">Sign in with Google</p>
    </div>
  );
}

export default SignInWithGoogleButton