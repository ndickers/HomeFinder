import {
  Navbar as FlowbiteNav,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <FlowbiteNav
        fluid
        rounded
        className="w-full lg:w-[80%] relative lg:mx-auto bg-[#FEF7F2]"
      >
        <NavbarBrand href="">
          <Image
            className="w-[70px] md:w-[80px] lg:w-[90px] h-auto"
            src={"/assets/homeFinderLogo.png"}
            alt="home finder logo"
            width={100}
            height={100}
          />
        </NavbarBrand>
        <div className="flex md:order-2">
          <Link
            href={""}
            className="flex items-center mr-2 my-0 bg-[#2B1B12] text-[#ffff] px-2 text-xs md:text-base md:px-4 md:py-2 rounded-lg"
          >
            Sign up
          </Link>
          <NavbarToggle />
        </div>
        <NavbarCollapse className="text-[#2b1b12] absolute bg-[#f5f5f5] md:bg-[#FEF7F2] max-w-[95%] p-3 rounded-[1rem]  md:max-w-none top-14 md:top-0 md:relative  text-xl">
          <Link className="nav-link" href="#">
            Home
          </Link>
          <Link className="nav-link" href="#">
            About
          </Link>
          <Link className="nav-link" href="#">
            Services
          </Link>
          <Link className="nav-link" href="#">
            Pricing
          </Link>
          <Link className="nav-link" href="#">
            Contact
          </Link>
        </NavbarCollapse>
      </FlowbiteNav>
    </>
  );
}
