import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SocialMedia = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* for github */}
      <Link
        href="https://github.com/Vinay-Pratap-Singh"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant={"outline"}
          className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
        >
          <i className="fa-brands fa-github" />
          <p>Github</p>
        </Button>
      </Link>

      {/* for linkedin */}
      <Link
        href="https://www.linkedin.com/in/vinay-pratap-singh-harvi-4b265a212/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant={"outline"}
          className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
        >
          <i className="fa-brands fa-linkedin" />
          <p>Linkedin</p>
        </Button>
      </Link>

      {/* for report bug */}
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSeVG5P47rFl5HtVoDCmJuyC8gKrFLN1FRLP83WJDrfefO6rjQ/viewform?usp=sf_link"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant={"outline"}
          className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
        >
          <i className="fa-solid fa-bug" />
          <p>Report a bug</p>
        </Button>
      </Link>

      {/* for contact us */}
      <Link
        href="https://harvi.netlify.app/contact"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          variant={"outline"}
          className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
        >
          <i className="fa-solid fa-id-badge" />
          <p>Contact us</p>
        </Button>
      </Link>
    </div>
  );
};

export default SocialMedia;
