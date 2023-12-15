import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  connectSocket,
  createNewRoom,
  deleteRoom,
  joinNewRoom,
  setName,
  setRoomId,
} from "@/redux/socketSlice";
import React, { useEffect } from "react";

const LiveCollaboration = () => {
  const dispatch = useAppDispatch();
  const { socket, userRole, name, roomId } = useAppSelector(
    (state) => state.socket
  );

  // function to handle copy room code
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast({ title: "Room code copied" });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("roomCreated", ({ roomId }: { roomId: string }) => {
      dispatch(setRoomId(roomId));
      toast({
        title: "Room created successfully",
        description: `Share your room code "${roomId}" with your friends to join`,
      });
    });

    socket.on("userJoin", ({ name }: { name: string }) => {
      toast({ title: `${name} joined the drawing board` });
    });

    socket.on("userLeave", ({ name }: { name: string }) => {
      toast({ title: `${name} left the drawing board` });
    });

    socket.on("invalidRoom", ({ message }: { message: string }) => {
      toast({ title: "Failed to join room", description: message });
    });

    socket.on("roomDeleted", ({ message }: { message: string }) => {
      toast({
        title: message,
      });
      dispatch(deleteRoom());
    });
  }, [socket, dispatch]);

  return (
    <div>
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
        <DialogContent className="w-fit">
          <Tabs defaultValue="account" className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    {userRole === "admin" && roomId
                      ? "Current shared room"
                      : "Create a room"}
                  </CardTitle>
                  {userRole === "admin" && roomId && (
                    <CardDescription>
                      Copy the room code and share it with your friends to
                      invite them on the board.
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  {userRole === "admin" && roomId ? (
                    <div className="flex items-center justify-between gap-3">
                      <p className="line-clamp-1">{roomId}</p>
                      <Button variant={"outline"} onClick={copyRoomCode}>
                        <i className="fa-solid fa-copy" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Label htmlFor="username">Your name</Label>
                      <Input
                        disabled={userRole === "user" && Boolean(roomId)}
                        id="username"
                        placeholder="Harvi"
                        value={name}
                        onChange={(event) =>
                          dispatch(setName(event.target.value))
                        }
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {userRole === "admin" && roomId ? (
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => {
                          socket.emit("leaveBoard", { roomId, name });
                          dispatch(deleteRoom());
                        }}
                      >
                        Leave board
                      </Button>
                      <Button
                        type="button"
                        className="w-full"
                        variant={"destructive"}
                        onClick={() => socket.emit("deleteRoom", { roomId })}
                      >
                        Stop board sharing
                      </Button>
                    </div>
                  ) : (
                    <Button
                      disabled={name.length < 4 || userRole === "user"}
                      type="button"
                      className="w-full"
                      onClick={() => {
                        dispatch(connectSocket());
                        dispatch(createNewRoom());
                      }}
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
                    {userRole === "user" && roomId
                      ? "Current joined room"
                      : "Join a room"}
                  </CardTitle>
                  {userRole === "user" && roomId && (
                    <CardDescription>
                      {name}, You had joined a room, you can work with others on
                      the sketch board. <br />
                      You can share room code with your friends to invite them.
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {userRole === "user" && roomId && name ? (
                      <div className="flex items-center justify-between gap-3">
                        <p className="line-clamp-1">{roomId}</p>
                        <Button variant={"outline"} onClick={copyRoomCode}>
                          <i className="fa-solid fa-copy" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="username">Your name</Label>
                          <Input
                            id="username"
                            type="text"
                            placeholder="Harvi"
                            value={name}
                            disabled={userRole === "admin" && Boolean(roomId)}
                            onChange={(event) =>
                              dispatch(setName(event.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="roomcode">Room ID</Label>
                          <Input
                            id="roomcode"
                            type="text"
                            placeholder="Room code"
                            value={roomId}
                            disabled={userRole === "admin" && Boolean(roomId)}
                            onChange={(event) =>
                              dispatch(setRoomId(event.target.value))
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {userRole === "user" && roomId && name ? (
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={() => {
                        socket.emit("leaveBoard", { roomId, name });
                        dispatch(deleteRoom());
                      }}
                      disabled={name.length < 4 || roomId.length < 5}
                    >
                      Leave board
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => {
                        dispatch(connectSocket());
                        dispatch(joinNewRoom());
                      }}
                      disabled={
                        name.length < 4 ||
                        roomId.length < 5 ||
                        userRole === "admin"
                      }
                    >
                      Join
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveCollaboration;
