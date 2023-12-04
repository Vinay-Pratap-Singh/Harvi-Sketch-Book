import React, { useId } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { colorCodes } from "@/constants/ColorCodes";
import ColorBlocks from "./ColorBlocks";

const Sidebar = () => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-5 top-5">
        <Button variant="outline" size={"sm"} className="hover:bg-mainTertiary">
          <i className="fa-solid fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72">
        <SheetHeader>{/* <SheetTitle>Edit profile</SheetTitle> */}</SheetHeader>
        <div className="">
          {/* for stroke color */}
          <div className="space-y-1">
            <p className="text-xs">Stroke</p>
            <div className="flex items-center justify-between">
              {colorCodes &&
                Object.entries(colorCodes).map(([key, value]) => {
                  return <ColorBlocks key={key} colorCode={value} />;
                })}

              <Separator orientation="vertical" className="h-5" />

              {/* color picker */}
              <div
                tabIndex={0}
                className="rounded-[8px] border-[1px] border-mainPrimary w-fit cursor-pointer"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label className="cursor-pointer">
                        <div className="w-5 h-5 bg-black rounded-[6px] m-[2px]"></div>
                        <Input
                          type="color"
                          className="w-5 h-5 hidden"
                          onChange={handleColorChange}
                        />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose custom color</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
