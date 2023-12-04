"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const HeaderToolBox = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  return (
    <section className="w-fit flex items-center my-5 py-2 px-4 shadow-md rounded-md space-x-2">
      {/* for lock and unlock */}
      <Button
        variant={"ghost"}
        size={"sm"}
        className="hover:bg-mainTertiary"
        onClick={() => setIsLocked(!isLocked)}
      >
        {isLocked ? (
          <i className="fa-solid fa-lock" />
        ) : (
          <i className="fa-solid fa-lock-open" />
        )}
      </Button>

      <Separator orientation="vertical" />

      {/* for square */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-regular fa-square" />
      </Button>

      {/* for circle */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-regular fa-circle" />
      </Button>

      {/* for arrow */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-arrow-right" />
      </Button>

      {/* for line */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-minus" />
      </Button>

      {/* for text */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-font" />
      </Button>

      {/* for image */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-regular fa-image" />
      </Button>

      {/* for pencil */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-pencil" />
      </Button>

      <Separator orientation="vertical" />

      {/* for undo */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-rotate-left" />
      </Button>

      {/* for redo */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-rotate-right" />
      </Button>

      {/* for eraser */}
      <Button variant={"ghost"} size={"sm"} className="hover:bg-mainTertiary">
        <i className="fa-solid fa-eraser" />
      </Button>
    </section>
  );
};

export default HeaderToolBox;
