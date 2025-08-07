import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/Inputline";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Footer } from "@/components/layout/Footer";
export default function Contact() {
  return (
    <div className="text-[#2b1b12] bg-[#FEF7F2]">
      <Navbar />
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold mt-8 text-center">Contact Us</h2>
        <p className="text-center text-[#717171] my-4 mb-8 w-[70%] mx-auto">
          Any question or remarks? Just write us a message!
        </p>
        <div className="md:flex md:items-start md:px-6">
          <div className="bg-[#000000] md:w-[35%] md:py-8 max-w-[600px] md:max-w-none py-6 text-[#fff] w-[90%] mx-auto text-center rounded-md">
            <p className="text-xl font-semibold">Contact Information</p>
            <p className="text-[#C9C9C9] text-xs my-4">
              Say something to start a live chat!
            </p>
            <div>
              <Image
                src={"/assets/phone-call.svg"}
                width={35}
                height={35}
                className="mx-auto"
                alt="+2547 6866 5354"
              />
              <p className="text-xs mt-4">+2547 6866 5354</p>
            </div>

            <div className="mt-4">
              <Image
                src={"/assets/sharp-email.svg"}
                width={35}
                className="mx-auto"
                height={35}
                alt="bryondickers@gmail.com"
              />
              <p className="text-xs mt-4">bryondickers@gmail.com</p>
            </div>
            <div className="mt-3">
              <Image
                className="mx-auto"
                src={"/assets/carbon_location.svg"}
                width={35}
                height={35}
                alt="Location"
              />
              <p className="text-xs mt-4">
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </p>
            </div>
          </div>
          <div className="w-[95%] max-w-[600px] md:max-w-none md:w-[65%] mx-auto">
            <div className="px-6 py-6">
              <div className="md:flex md:items-center md:gap-6">
                <div className=" md:w-full">
                  <label className="text-[#8D8D8D]" htmlFor="fname">
                    First Name
                  </label>
                  <input
                    id="fname"
                    type="text"
                    placeholder=""
                    className="border-[#8D8D8D] text-sm  border-b py-1.5 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:w-full">
                  <label className="text-[#8D8D8D]" htmlFor="lname">
                    Last Name
                  </label>
                  <input
                    id="lname"
                    type="text"
                    placeholder=""
                    className="border-[#8D8D8D] text-sm  border-b py-1.5 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
                  />
                </div>
              </div>
              <div className="md:flex md:items-center md:gap-6">
                <div className="mt-4 md:mt-8 md:w-full">
                  <label className="text-[#8D8D8D]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder=""
                    className="border-[#8D8D8D] text-sm  border-b py-1.5 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
                  />
                </div>
                <div className="mt-4 md:mt-8 md:w-full">
                  <label className="text-[#8D8D8D]" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder=""
                    className="border-[#8D8D8D] text-sm  border-b py-1.5 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold mt-4 my-3">Select Subject</p>
                <RadioGroup
                  defaultValue="option-one"
                  className="flex justify-between my-4"
                >
                  <div className="md:flex md:gap-x-4">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <label
                        htmlFor="option-one"
                        className="text-xs text-nowrap"
                      >
                        General Inquiry
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <label
                        htmlFor="option-two"
                        className="text-xs text-nowrap"
                      >
                        General Inquiry
                      </label>
                    </div>
                  </div>
                  <div className="md:flex md:gap-x-4">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                      <RadioGroupItem value="option-three" id="option-one" />
                      <label
                        htmlFor="option-three"
                        className="text-xs text-nowrap"
                      >
                        General Inquiry
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-four" id="option-two" />
                      <label
                        htmlFor="option-four"
                        className="text-xs text-nowrap"
                      >
                        General Inquiry
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-6">
                <label className="text-[#8D8D8D]" htmlFor="message">
                  Write your message..
                </label>
                <textarea
                  id="message"
                  placeholder=""
                  className="border-[#8D8D8D] resize-none text-sm  border-b py-1 px-1 mx-auto block w-full placeholder:mb-8 focus:outline-none"
                />
              </div>
              <button className="block text-[#fff] bg-[#000000] mt-6 text-xs rounded-sm md:w-[10rem] md:ml-auto font-medium my-4 w-full py-2.5">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
