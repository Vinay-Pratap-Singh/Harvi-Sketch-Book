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
import React from "react";

const ResetCanvas = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
          >
            <i className="fa-solid fa-trash" />
            <p>Reset the canvas</p>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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
            <AlertDialogAction onClick={() => dispatch(resetCanvas())}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResetCanvas;
