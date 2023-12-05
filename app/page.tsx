"use client";
import Image from 'next/image'
import React, {useState} from "react";
import {render} from "react-dom";
import App from './App';

export default function Home() {
  

  return (
    <>
    <div className="flex h-screen justify-center items-center transition-all duration-700">
      <div className="flex md:flex-row flex-col h-[650px] bg-white rounded-lg shadow-sm "  >
        <div className="md:border-r-[1px]">
          <div className="border-b-[1px] flex justify-center items-center py-10">
            <img src="/image/ooulet.png" alt="" className="w-1/2" />
          </div>
          <div className="px-8 py-8 flex flex-col gap-2">
            <img src="/image/1.jpg" alt="" className="w-[65px] h-[65px] rounded-full"/>
            <p className="text-base font-semibold text-[#a2a2a2]">Ooulet - Create Website for Free</p>
            <h2 className="text-2xl font-semibold ">Free Phone Consultation</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
              <img src="/image/time.png" alt="" className="w-[25px] "/>
              <p className="text-[#a2a2a2] font-medium">30 mint</p>
              </div>
              <div className="flex gap-4">
              <img src="/image/phone.png" alt="" className="w-[25px]"/>
              <p className="text-[#a2a2a2] font-medium">Phone call</p>
              </div>
              <div className="py-4">
                <p className=" font-medium">Have queries?</p>
                <p>No worries, our experts will help you.</p>
                <p className="py-6">Pick a time that suits you, and we will call you back.</p>
              </div>
              </div>
          </div>
        </div>
        

        <div className="px-4 transition-all duration-700 bg-white">
        <App />
      </div>

      </div> 

    </div>

    </>
  )
}
