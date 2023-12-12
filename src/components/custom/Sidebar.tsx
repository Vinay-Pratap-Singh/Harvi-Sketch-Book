import React, { useRef, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
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

import ColorBlocks from "./ColorBlocks";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setFontType,
  setShapeFillColor,
  setSketchBookBackgroundColor,
  setStrokeColor,
  setStrokeWidth,
} from "@/redux/toolkitSlice";
import {
  CANVAS_BG_COLOR_CODE,
  FONT_TYPE,
  STROKE_LINE_STYLE,
  STROKE_STYLE_COLOR_CODE,
} from "@/constants/constants";
import { IFontType, ILineStroke } from "@/helper/interface/interface";
import LineStrokeBlock from "./LineStrokeBlock";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { resetCanvas } from "@/redux/canvasSlice";
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
} from "../ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import io, { Socket } from "socket.io-client";
import ExportSketch from "./sidebar/ExportSketch";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const {
    strokeColor,
    sketchBookBackground,
    strokeWidth,
    currentShape,
    shapeFillColor,
    fontType,
  } = useAppSelector((state) => state.toolkit);
  const { toast } = useToast();

  const socket = useRef<Socket | null>(null);
  const [userDetails, setUserDetails] = useState({
    isAdmin: false,
    name: "",
    roomId: "",
  });

  const connectToSocket = () => {
    const newSocket = io(process.env.SERVER_URL || "http://localhost:5000");
    socket.current = newSocket;

    if (!socket.current) return;
    socket.current.on("userLeave", ({ name: userName }: { name: string }) => {
      toast({ title: `${userName} left the room.` });
    });
  };

  const createRoom = () => {
    // connecting to socket
    connectToSocket();
    console.log(socket.current);
    if (!socket.current) return;
    socket.current.emit("createRoom", { name: userDetails?.name });

    // room created
    socket.current.on(
      "roomCreated",
      ({ roomId: newRoomId }: { roomId: string }) => {
        setUserDetails({ ...userDetails, isAdmin: true, roomId: newRoomId });
        toast({
          title: "Room created successfully",
        });
      }
    );
  };

  const joinRoom = () => {
    // if already an admin
    if (userDetails.isAdmin && userDetails.roomId) {
      toast({
        title: "Prohibited !",
        description: "You are already an admin of a room",
      });
      return;
    }

    // connecting to socket
    connectToSocket();
    if (!socket.current) return;
    socket.current.emit("joinRoom", {
      userId: userDetails?.roomId,
      name: userDetails?.name,
    });

    setUserDetails({ ...userDetails, isAdmin: false });

    // user joined the room
    socket.current.on(
      "userJoin",
      ({
        userId: newUserId,
        name: userName,
      }: {
        userId: string;
        name: string;
      }) => {
        toast({ title: `${userName} joined the room.` });
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-5 top-5">
        <Button variant="outline" size={"sm"} className="hover:bg-mainTertiary">
          <i className="fa-solid fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-72 overflow-y-scroll">
        <div className="space-y-5">
          {/* for stroke color */}
          <div className="space-y-1">
            <p className="text-xs font-medium">
              {currentShape === "text" ? "Font color" : "Stroke color"}
            </p>
            <div className="flex items-center justify-between">
              {STROKE_STYLE_COLOR_CODE &&
                STROKE_STYLE_COLOR_CODE.map((color) => {
                  return (
                    <ColorBlocks
                      key={uuidv4()}
                      colorCode={color}
                      type="stroke"
                    />
                  );
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
                        <div
                          style={{ backgroundColor: strokeColor }}
                          className="w-5 h-5 rounded-[6px] m-[2px]"
                        ></div>
                        <Input
                          type="color"
                          className="hidden"
                          onChange={(event) => {
                            if (currentShape === "eraser") {
                              toast({
                                description:
                                  "Feature disabled while using eraser",
                              });
                              return;
                            }
                            dispatch(setStrokeColor(event.target.value));
                          }}
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

          {/* for stroke width */}
          <div className="space-y-1">
            <p className="text-xs font-medium">
              {currentShape === "eraser"
                ? "Eraser size"
                : currentShape === "text"
                ? "Font size"
                : "Stroke width"}
            </p>
            <div>
              <Input
                type="range"
                min={currentShape === "text" ? 16 : 1}
                max={
                  currentShape === "eraser"
                    ? 100
                    : currentShape === "text"
                    ? 50
                    : 20
                }
                className="h-4"
                value={strokeWidth}
                onChange={(event) => {
                  dispatch(setStrokeWidth(Number(event.target.value)));
                }}
              />
            </div>
          </div>

          {/* for font type */}
          {currentShape === "text" && (
            <div>
              <Label>
                <p className="mb-2 text-xs">Font type</p>
                <Select
                  value={fontType}
                  onValueChange={(value) => dispatch(setFontType(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fonts</SelectLabel>
                      {FONT_TYPE &&
                        FONT_TYPE.map((font: IFontType) => {
                          return (
                            <SelectItem key={uuidv4()} value={font.value}>
                              {font.name}
                            </SelectItem>
                          );
                        })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          )}

          {/* for stroke style */}
          {currentShape !== "text" && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Stroke style</p>
              <div className="flex items-center gap-2">
                {STROKE_LINE_STYLE &&
                  STROKE_LINE_STYLE.map((stroke: ILineStroke) => {
                    return <LineStrokeBlock key={uuidv4()} data={stroke} />;
                  })}
              </div>
            </div>
          )}

          {/* for shape fill color */}
          {(currentShape === "square" || currentShape === "circle") && (
            <div className="space-y-1">
              <p className="text-xs font-medium">Shape fill color</p>
              <div className="flex items-center justify-between">
                {CANVAS_BG_COLOR_CODE &&
                  CANVAS_BG_COLOR_CODE.map((color) => {
                    return (
                      <ColorBlocks
                        key={uuidv4()}
                        colorCode={color}
                        type="shapeFill"
                      />
                    );
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
                          <div
                            style={{ backgroundColor: shapeFillColor }}
                            className="w-5 h-5 rounded-[6px] m-[2px]"
                          ></div>
                          <Input
                            type="color"
                            className="hidden"
                            onChange={(event) =>
                              dispatch(setShapeFillColor(event.target.value))
                            }
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
          )}

          {/* for canvas background color */}
          <div className="space-y-1">
            <p className="text-xs font-medium">Sketch book background</p>
            <div className="flex items-center justify-between">
              {CANVAS_BG_COLOR_CODE &&
                CANVAS_BG_COLOR_CODE.map((color) => {
                  return (
                    <ColorBlocks
                      key={uuidv4()}
                      colorCode={color}
                      type="canvas"
                    />
                  );
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
                        <div
                          style={{ backgroundColor: sketchBookBackground }}
                          className="w-5 h-5 rounded-[6px] m-[2px]"
                        ></div>
                        <Input
                          type="color"
                          className="hidden"
                          onChange={(event) => {
                            if (currentShape === "eraser") {
                              toast({
                                description:
                                  "Feature disabled while using eraser",
                              });
                              return;
                            }
                            dispatch(
                              setSketchBookBackgroundColor(event.target.value)
                            );
                          }}
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

          <Separator orientation="horizontal" />

          {/* for extra option */}
          <div className="space-y-2">
            {/* export sketch */}
            <ExportSketch />

            {/* live collaboration */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
                >
                  <i className="fa-solid fa-user-group" />
                  <p>Live collaboration</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <Tabs defaultValue="account" className="w-[350px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="join">Join</TabsTrigger>
                  </TabsList>
                  <TabsContent value="create">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-center">
                          {userDetails?.isAdmin && userDetails?.roomId
                            ? "Your current room"
                            : "Create a room"}
                        </CardTitle>
                        {userDetails?.isAdmin && userDetails?.roomId && (
                          <CardDescription>
                            Please copy and share the room code with your
                            friends to join the drawing board.
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          {userDetails?.isAdmin && userDetails?.roomId ? (
                            <div className="flex items-center justify-between">
                              <p>{userDetails?.roomId}</p>
                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    userDetails?.roomId
                                  );
                                  toast({
                                    title: "Room ID copied ...",
                                  });
                                }}
                              >
                                <i className="fa-solid fa-copy" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Label htmlFor="username">Your name</Label>
                              <Input
                                disabled={
                                  !userDetails?.isAdmin &&
                                  Boolean(userDetails?.roomId)
                                }
                                id="username"
                                placeholder="Harvi"
                                value={userDetails?.name}
                                onChange={(event) =>
                                  setUserDetails({
                                    ...userDetails,
                                    name: event.target.value,
                                  })
                                }
                              />
                            </>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        {userDetails?.isAdmin && userDetails?.roomId ? (
                          <Button
                            type="button"
                            className="w-full"
                            onClick={createRoom}
                            variant={"destructive"}
                          >
                            Delete room
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            className="w-full"
                            onClick={createRoom}
                            disabled={
                              userDetails.name.length < 3 ||
                              (!userDetails?.isAdmin &&
                                Boolean(userDetails?.roomId))
                            }
                          >
                            Create
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="join">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-center">
                          Join a room
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <div>
                            <Label htmlFor="username">Your name</Label>
                            <Input
                              disabled={userDetails?.isAdmin}
                              id="username"
                              type="text"
                              placeholder="Harvi"
                              value={userDetails?.name}
                              onChange={(event) =>
                                setUserDetails({
                                  ...userDetails,
                                  name: event.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="roomcode">Room ID</Label>
                            <Input
                              disabled={userDetails?.isAdmin}
                              id="roomcode"
                              type="text"
                              placeholder="Room code"
                              value={userDetails.roomId}
                              onChange={(event) =>
                                setUserDetails({
                                  ...userDetails,
                                  roomId: event.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          disabled={
                            userDetails.name.length < 3 ||
                            userDetails.roomId.length < 5 ||
                            userDetails.isAdmin
                          }
                          className="w-full"
                          onClick={joinRoom}
                        >
                          Join
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            {/* reset canvas */}
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
                    This action cannot be undone. This will clear all your work
                    from the sketch board.
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

          <Separator />

          {/* for social media options */}
          <div className="space-y-2">
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-brands fa-github" />
              <p>Github</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-brands fa-linkedin" />
              <p>Linkedin</p>
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-mainSecondary w-full flex items-center justify-start gap-2"
            >
              <i className="fa-solid fa-bug" />
              <p>Report a bug</p>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
