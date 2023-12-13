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
      <Button
        variant={"outline"}
        className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
      >
        <i className="fa-solid fa-bug" />
        <p>Report a bug</p>
      </Button>
    </div>
  );
};

export default SocialMedia;
