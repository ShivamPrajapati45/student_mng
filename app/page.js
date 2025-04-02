'use client'
import AuthBox from "@/components/AuthBox";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Home() {

  const {role} = useSelector((state) => state.user)
  console.log(role)

  return (
    <main className="h-screen w-full flex justify-center items-center bg-[#2a2a2a]">
      <div className="">
        <h1 className="text-xl uppercase font-semibold text-white text-center mb-5">Login</h1>
        <AuthBox/>
      </div>
      <Toaster/>
    </main>
  );
}
