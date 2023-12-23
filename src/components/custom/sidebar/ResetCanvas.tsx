import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { resetCanvas } from "@/redux/canvasSlice";
import { resetToolkit } from "@/redux/toolkitSlice";
import React, { useState } from "react";

const ResetCanvas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetCanvas());
    dispatch(resetToolkit());
    setIsOpen(false);
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
          >
            <i className="fa-solid fa-trash" />
            <p>Reset the canvas</p>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-72 sm:w-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to reset the canvas?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will clear all your work from
              the sketch board.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResetCanvas;
