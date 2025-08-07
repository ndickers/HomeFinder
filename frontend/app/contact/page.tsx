import React from "react";
import Image from "next/image";

export default function Contact() {
  return (
    <div>
      <h2>Contact Us</h2>
      <p>Any question or remarks? Just write us a message!</p>
      <div>
        <p>Contact Information</p>
        <p>Say something to start a live chat!</p>

        <div>
          <Image
            src={"/public/phone-call.svg"}
            width={100}
            height={100}
            alt="+2547 6866 5354"
          />
          <p>+2547 6866 5354</p>
        </div>

        <div>
          <Image
            src={"/public/sharp-email.svg"}
            width={100}
            height={100}
            alt="bryondickers@gmail.com"
          />
          <p>bryondickers@gmail.com</p>
        </div>
        <div>
          <Image
            src={"/public/carbon-location.svg"}
            width={100}
            height={100}
            alt="Location"
          />
          <p>132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
        </div>
      </div>
    </div>
  );
}
