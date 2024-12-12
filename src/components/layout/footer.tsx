import React from "react";
import { Github } from "lucide-react";
import Image from "next/image";
import { MoonStar } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-400">

        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
          </svg>
        </div>

        <div className="flex justify-center items-center pb-[50px] pt-[50px]">
          <MoonStar className="h-10 w-10 mr-[10px]" />
          <h1 className="text-3xl justify-center"> BLUEMOON APARTMENTS</h1>
        </div>

        <div className="flex justify-between items-start p-10">

  <div className="w-1/3 text-center">
    <h6 className="text-lg font-semibold mb-4 text-gray-800">Get to know us</h6>
    <ul className="space-y-2 text-gray-600">
      <li className="hover:underline cursor-pointer">FAQ</li>
      <li className="hover:underline cursor-pointer">Contact Us</li>
      <li className="hover:underline cursor-pointer">Careers</li>
    </ul>
  </div>

  <div className="w-1/3 text-center">
    <h6 className="text-lg font-semibold mb-4 text-gray-800">Connect with us</h6>
    <div className="flex justify-center space-x-4">
      <img
        src="/img/fb1.png"
        alt="Facebook"
        className="w-8 h-8 hover:scale-110 transition transform cursor-pointer"
      />
      <img
        src="/img/insta1.svg"
        alt="Instagram"
        className="w-8 h-8 hover:scale-110 transition transform cursor-pointer"
      />
      <img
        src="/img/x3.png"
        alt="Twitter"
        className="w-8 h-8 hover:scale-110 transition transform cursor-pointer"
      />
      <img
        src="/img/ytb1.png"
        alt="Youtube"
        className="w-8 h-8 hover:scale-110 transition transform cursor-pointer"
      />
    </div>
  </div>

  <div className="w-1/3 text-center">
    <h6 className="text-lg font-semibold mb-4 text-gray-800">Get inspired</h6>
    <p className="text-gray-600 mb-4">
      Subscribe to our newsletter for the latest update
    </p>
    <button className="px-6 py-2 rounded-lg shadow-md border border-black hover:bg-gray-700 ">
      Subscribe
    </button>
  </div>
</div>


        <div className="container mx-auto pt-[20px] pb-[20px]">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                © 2024 BlueMoon Apartments  
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}