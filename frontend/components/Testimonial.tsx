import Image from "next/image";
import React from "react";

export default function Testimonial() {
  return (
    <div className="bg-[#fff] mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={"/assets/user-1.png"}
            width={50}
            height={50}
            alt="user 1"
          />
          <div>
            <p className="font-semibold text-xs">Cameron Williamson</p>
            <p className="text-[10px]">Designer</p>
          </div>
        </div>
        <Image src={"/assets/quote.svg"} width={30} height={30} alt="quote" />
      </div>
      <p className="text-sm leading-relaxed mt-2 lg:text-base">
        Searches for multiplexes, property comparisons, and the loan estimator.
        Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dores.
      </p>
    </div>
  );
}
