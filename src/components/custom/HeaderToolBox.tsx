"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const HeaderToolBox = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  return (
    <section className="w-fit flex items-center my-5 py-2 px-4 shadow-md rounded-md space-x-2">
      {/* for lock and unlock */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent>
            <p>{isLocked ? "Unlock sketch board" : "Lock sketch board"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" />

      {/* for square */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-regular fa-square" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Square</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for circle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-regular fa-circle" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Circle</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for arrow */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-arrow-right" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Arrow</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for line */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-minus" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Line</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for text */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-font" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for image */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-regular fa-image" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for pencil */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-pencil" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Draw</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" />

      {/* for undo */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-rotate-left" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for redo */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-rotate-right" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* for eraser */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="hover:bg-mainTertiary"
            >
              <i className="fa-solid fa-eraser" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eraser</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
};

export default HeaderToolBox;
