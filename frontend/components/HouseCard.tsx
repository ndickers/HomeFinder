import React from "react";
import Link from "next/link";
import Image from "next/image";
import { roboto } from "./ui/font";
export default function HouseCard() {
  return (
    <article
      className={`${roboto.className} rounded-2xl group-article w-[300px] relative  bg-[#ffffff]`}
    >
      <Image
        src={"/assets/118.png"}
        className="w-full h-auto object-cover rounded-md"
        width={100}
        height={100}
        alt="apartment"
      />
      <p className="absolute top-4 text-[10px] ml-4 text-[#fff] bg-[#1F4B43] font-medium py-[1px] px-1.5 rounded-l-full rounded-r-full">
        FOR SALE
      </p>
      <div className="bg-[#fff] absolute bottom-4 p-3 w-[90%] text-[#1A1A1A] left-1/2 transform -translate-x-1/2 rounded-sm">
        <p className=" font-semibold text-base">Luxury Family Home</p>
        <div className="flex items-center gap-x-1 my-1">
          <Image
            src={"/assets/location-icon.svg"}
            width={13}
            height={13}
            alt="location icon"
          />
          <p className="text-sm">1800-1818 79th St</p>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-sm font-bold text-[#EB664E]">$2800</p>
          <div className="flex items-center gap-x-1 justify-center">
            <Image
              src={"/assets/rooms.svg"}
              width={17}
              height={17}
              alt="Room icon"
            />
            <p className="text-xs">3 rooms</p>
          </div>
        </div>
      </div>
    </article>
  );
}
