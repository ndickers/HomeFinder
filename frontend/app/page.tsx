import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/layout/Footer";
import HouseCard from "../components/HouseCard";
import { montserrat } from "@/components/ui/font";
import Testimonial from "../components/Testimonial";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <div className="">
      <section className="bg-[#FEF7F2] md:px-6 lg:px-16 lg:pt-12">
        <Navbar />
        <div className="md:flex justify-center lg:w-[80%] lg:mx-auto mx-2 md:mx-4">
          <div className="mx-6 md:ml-auto max-w-[400px] lg:mt-12 lg:mx-0">
            <h1 className="text-[2B1B12] mt-8 md:mt-16 mb-4 font-bold text-3xl lg:text-4xl">
              Find Your Dream Home
            </h1>
            <p className="text-[#4F3527] lg:text-[18px] lg:font-medium">
              Explore our curated selection of exquisite properties meticulously
              tailored to your unique dream home vision
            </p>
            <Link
              href=""
              className="bg-[#2B1B12] text-[#fff] px-4 rounded-md mt-8 inline-block py-2"
            >
              Sign up
            </Link>
          </div>
          <Image
            className="ml-auto -mt-16 md:mt-0 md:mr-auto lg:mx-0 md:w-[600px] lg:w-[650px] md:h-[auto]"
            width={300}
            height={300}
            src={"/assets/hero-image.png"}
            alt="house image"
          />
        </div>
      </section>
      <section className="lg:w-[80%] pl-4 md:p-8 mx-auto md:flex-wrap relative">
        <h4 className="font-bold my-4 text-2xl text-center">
          Properties for Rent
        </h4>
        <div className=" shadowDiv h-[700px] md:h-[600px] flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 bg-[#FEFEFE]">
          <div className="w-full flex flex-col overflow-y-auto hide-scrollbar md:flex-row md:flex-wrap items-center lg:gap-8 justify-center gap-4">
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
          </div>
          <Link
            href="/auth/login"
            className="bg-[#2B1B12] text-[#fff] absolute bottom-20 md:bottom-24 z-30 py-2 px-5 rounded-e-full rounded-s-full"
          >
            Find your next home
          </Link>
        </div>
      </section>
      <section
        className={`text-[#2B1B12] lg:w-[80%] md:-mt-12 mb-8 md:mb-16 mx-auto ${montserrat.className} md:flex md:items-center lg:gap-8 md:gap-6`}
      >
        <Image
          className="w-full max-w-[500px] md:max-w-[400px] lg:max-w-[450px] mx-auto md:mr-0"
          src={"/assets/luxury_and_home.png"}
          width={200}
          height={200}
          alt="luxury home image"
        />
        <div className="px-3 md:px-0 md:ml-0 max-w-[500px] lg:max-w-[450px] md:max-w-[400px] mx-auto">
          <h3 className="font-bold text-2xl mt-4 mb-3">
            We Help You To Find Your Dream Home
          </h3>
          <p className="text-base font-medium text-[#4F3527]">
            From cozy cottages to luxurious estates, our dedicated team guides
            you through every step of the journey, ensuring your dream home
            becomes a reality
          </p>
          <div className="flex justify-between items-center my-3">
            <div>
              <p className="text-2xl font-bold">8K+</p>
              <p className="text-[0.65rem] text-nowrap">Houses Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold">6K+</p>
              <p className="text-[0.65rem] text-nowrap">Houses Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold">2K+</p>
              <p className="text-[0.65rem] text-nowrap">Trusted Agents</p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-[#2B1B12] bg-[#FEF7F2] px-4 pb-8 pt-5 md:py-12">
        <div className="w-[80%] mx-auto md:max-w-[550px] lg:max-w-none pt-6 md:pt-0">
          <h3 className="font-bold text-2xl text-center mb-4">Why Choose Us</h3>
          <p className="text-base font-medium leading-relaxed text-center max-w-[500px] mx-auto">
            Elevating Your Home Buying Experience with Expertise, Integrity, and
            Unmatched Personalized Service
          </p>
          <div className="flex flex-col items-center gap-5 mb-4 mt-6 md:grid md:grid-cols-2 md:gap-4 lg:gap-0 md:justify-items-center md:gap-y-4 lg:grid-cols-4">
            <article className="bg-[#DDC7BB] px-4 py-6 rounded-md max-w-[240px]">
              <div className="bg-[#FBF5F1] p-1.5 inline-block rounded-sm">
                <Image
                  className=""
                  src={"/assets/map-pin.svg"}
                  width={35}
                  height={35}
                  alt="Expert Guidance"
                />
              </div>
              <h4 className="my-2 font-bold text-sm">Expert Guidance</h4>
              <p className="font-medium text-sm">
                Benefit from our team's seasoned expertise for a smooth buying
                experience
              </p>
            </article>
            <article className="bg-[#DDC7BB] px-4 py-6 rounded-md max-w-[240px]">
              <div className="bg-[#FBF5F1] p-1.5 inline-block rounded-sm">
                <Image
                  className=""
                  src={"/assets/user-icon.svg"}
                  width={35}
                  height={35}
                  alt="Personalized Service"
                />
              </div>
              <h4 className="my-2 font-bold text-sm">Personalized Service</h4>
              <p className="font-medium text-sm">
                Our services adapt to your unique needs, making your journey
                stress-free
              </p>
            </article>
            <article className="bg-[#DDC7BB] px-4 py-6 rounded-md max-w-[240px]">
              <div className="bg-[#FBF5F1] p-1.5 inline-block rounded-sm">
                <Image
                  className=""
                  src={"/assets/clip-icon.svg"}
                  width={35}
                  height={35}
                  alt="Transparent Process"
                />
              </div>
              <h4 className="my-2 font-bold text-sm">Transparent Process</h4>
              <p className="font-medium text-sm">
                Stay informed with our clear and honest approach to buying your
                home
              </p>
            </article>
            <article className="bg-[#DDC7BB] px-4 py-6 rounded-md max-w-[240px]">
              <div className="bg-[#FBF5F1] p-1.5 inline-block rounded-sm">
                <Image
                  className=""
                  src={"/assets/hand-icon.svg"}
                  width={35}
                  height={35}
                  alt="Exceptional Support"
                />
              </div>
              <h4 className="my-2 font-bold text-sm">Exceptional Support</h4>
              <p className="font-medium text-sm">
                Providing peace of mind with our responsive and attentive
                customer service
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="text-[#2B1B12] pt-5  px-4 md:flex md:mx-auto lg:w-[80%] md:py-16">
        <div className="max-w-[500px] md:max-w-[450px] mx-auto">
          <h3 className="text-2xl font-bold mb-3 mt-4">
            What People Say About HomeFinder
          </h3>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose injected humour and the like.
          </p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-bold text-xl">10m+</p>
              <p className="text-xs md:text-sm text-[#1A1A1A]">Happy People</p>
            </div>
            <div>
              <p className="font-bold text-xl">4.88</p>
              <p className="text-xs md:text-sm text-[#1A1A1A]">
                Overall rating
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white relative max-w-[500px] mb-6 md:max-w-[450px] mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Testimonial />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <section className=" px-3 bg-[#FEF7F2] pt-12">
        <div className="max-w-[500px] mx-auto">
          <h3 className="text-2xl text-center font-bold mb-4">
            Do You Have Any Questions? Get Help From Us
          </h3>
          <div className="my-4 flex flex-col gap-2 md:flex-row md:justify-around mt-4 mb-8">
            <div className="flex items-center gap-x-0.5 font-medium text-xs md:text-sm">
              <Image
                src={"/assets/verified-icon.svg"}
                width={17}
                height={17}
                alt="browse FAQ"
              />
              <p>Chat live with our support team</p>
            </div>
            <div className="flex items-center gap-x-0.5 font-medium text-xs md:text-sm">
              <Image
                src={"/assets/verified-icon.svg"}
                width={17}
                height={17}
                alt="browse FAQ"
              />
              <p>Browse our FAQ</p>
            </div>
          </div>
          <form className="flex items-center gap-4" action="">
            <div className="relative w-full max-w-sm">
              <Image
                src={"/assets/mail-icon.svg"}
                width={10}
                height={10}
                alt="Mail"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
              />
              <Input
                type="text"
                placeholder="Enter your email address..."
                className="pl-7 bg-[#DDC7BB] placeholder:text-[#543E32] placeholder:text-xs md:placeholder:text-sm placeholder:font-medium"
              />
            </div>
            <button className="bg-[#2B1B12] rounded-[0.3rem] py-[0.38rem] md:px-6 text-white md:text-base text-sm font-medium px-4">
              Submit
            </button>
          </form>
        </div>
        <div className="py-8 mx-auto text-[#1A1A1A] md:flex md:justify-between md:items-center max-w-[500px] md:max-w-[80%] lg:max-w-[70%]">
          <div>
            <h4 className="text-base font-semibold">
              Become a Real Estate Agent
            </h4>
            <p className="text-sm ">
              We only work with the best companies around the globe
            </p>
          </div>
          <Link
            href={""}
            className="inline-block px-4 py-1.5 mt-4 rounded-md bg-[#E7C873] font-medium"
          >
            Register Now
            <Image
              className="ml-1 inline-block"
              src={"/assets/arrow.svg"}
              width={14}
              height={14}
              alt="register agent"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
