'use client'
import AuthBox from "@/components/AuthBox";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Home() {

  const {role} = useSelector((state) => state.user)
  console.log(role)

  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="mt-20">
        <h1 className="text-xl uppercase font-semibold text-center mb-5">Login</h1>
        <AuthBox/>
      </div>
      <Toaster/>
    </main>
  );
}
