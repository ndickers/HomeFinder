"use client";

import {
  Footer as FlowbiteFooter,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import Image from "next/image";
export function Footer() {
  const date = new Date(Date.now());
  const year = date.getFullYear();

  console.log(year);

  return (
    <FlowbiteFooter className="bg-[#DDC7BB] mb-0 rounded-[0px] pt-4">
      <div className="w-full ">
        <div className="md:flex lg:w-[80%] md:ml-6 lg:mr-20 lg:mx-auto ">
          <div className="px-6 md:mt-6">
            <Image
              className="mx-auto md:ml-0 mb-4 w-[70px] md:w-[80px] lg:w-[90px] h-auto"
              src={"/assets/homefinder-2-logo.png"}
              alt="homeFinder logo"
              width={100}
              height={100}
            />
            <p className="text-center text-bold text-base tracking-wide leading-relaxed md:text-left md:w-[200px]">
              Bringing you closer to your dream home, one click at a time.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
            <div>
              <FooterTitle title="About" className="text-[#2B1B12]" />
              <FooterLinkGroup col>
                <FooterLink className="footer-link" href="#">
                  Our Story
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Careers
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Our Team
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Resources
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Support" className="text-[#2B1B12]" />
              <FooterLinkGroup col>
                <FooterLink className="footer-link" href="#">
                  FAQ
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Contact Us
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Help Center
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Terms of Service
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Find Us" className="text-[#2B1B12]" />
              <FooterLinkGroup col>
                <FooterLink className="footer-link" href="#">
                  Events
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Location
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Newsletter
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Our Social" className="text-[#2B1B12]" />
              <FooterLinkGroup col>
                <FooterLink className="footer-link" href="#">
                  iOS
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Android
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  Windows
                </FooterLink>
                <FooterLink className="footer-link" href="#">
                  MacOS
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full px-4 py-6 sm:flex sm:items-center sm:justify-between bg-[#BFA89B]">
          <FooterCopyright
            className="text-[#2B1B12] mx-auto"
            href="#"
            by="HomeFinder"
            year={year}
          />
        </div>
      </div>
    </FlowbiteFooter>
  );
}
