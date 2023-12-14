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
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LiveCollaboration = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const userRole = useRef<string>("");

  const createRoom = () => {
    if (!userRole.current && roomId && name) {
      toast({ title: "You are already in a room" });
      return;
    }
    const mySocket = io(process.env.SERVER_URL || "http://localhost:5000");
    if (!mySocket) return;
    setSocket(mySocket);
    mySocket.emit("createRoom", { name });
    userRole.current = "admin";
  };

  const joinRoom = () => {
    if (userRole.current && roomId && name) {
      toast({ title: "You are already in a room" });
      return;
    }
    const mySocket = io(process.env.SERVER_URL || "http://localhost:5000");
    if (!mySocket) return;
    setSocket(mySocket);
    mySocket.emit("joinRoom", { roomId, name });
    userRole.current = "user";
  };

  // function to handle copy room code
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast({ title: "Room code copied" });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("roomCreated", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      console.log(roomId);
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

    // return () => {
    //
    //   socket.removeAllListeners();
    // };
  }, [socket]);

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
                    {userRole.current === "admin" && roomId
                      ? "Current shared room"
                      : "Create a room"}
                  </CardTitle>
                  {userRole.current === "admin" && roomId && (
                    <CardDescription>
                      Copy the room code and share it with your friends to
                      invite them on the board.
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  {userRole.current === "admin" && roomId ? (
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
                        disabled={
                          userRole.current === "user" && Boolean(roomId)
                        }
                        id="username"
                        placeholder="Harvi"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {userRole.current === "admin" && roomId ? (
                    <div className="flex items-center gap-3">
                      <Button type="button" className="w-full">
                        Leave board
                      </Button>
                      <Button
                        type="button"
                        className="w-full"
                        variant={"destructive"}
                      >
                        Stop board sharing
                      </Button>
                    </div>
                  ) : (
                    <Button
                      disabled={name.length < 4 || userRole.current === "user"}
                      type="button"
                      className="w-full"
                      onClick={createRoom}
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
                    {userRole.current === "user" && roomId
                      ? "Current joined room"
                      : "Join a room"}
                  </CardTitle>
                  {userRole.current === "user" && roomId && (
                    <CardDescription>
                      {name}, You had joined a room, you can work with others on
                      the sketch board. <br />
                      You can share room code with your friends to invite them.
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {userRole.current === "user" && roomId && name ? (
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
                            disabled={
                              userRole.current === "admin" && Boolean(roomId)
                            }
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="roomcode">Room ID</Label>
                          <Input
                            id="roomcode"
                            type="text"
                            placeholder="Room code"
                            value={roomId}
                            disabled={
                              userRole.current === "admin" && Boolean(roomId)
                            }
                            onChange={(event) => setRoomId(event.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {userRole.current === "user" && roomId && name ? (
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={joinRoom}
                      disabled={name.length < 4 || roomId.length < 5}
                    >
                      Leave board
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={joinRoom}
                      disabled={
                        name.length < 4 ||
                        roomId.length < 5 ||
                        userRole.current === "admin"
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
