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
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const LiveCollaboration = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socket, setSocket] = useState<any>(null);

  const createRoom = () => {
    const mySocket = io(process.env.SERVER_URL || "http://localhost:5000");
    if (!mySocket) return;
    setSocket(mySocket);
    mySocket.emit("createRoom", { name });
  };

  const joinRoom = () => {
    const mySocket = io(process.env.SERVER_URL || "http://localhost:5000");
    if (!mySocket) return;
    setSocket(mySocket);
    mySocket.emit("joinRoom", { roomId, name });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("roomCreated", ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      toast({
        title: "Room created successfully",
        description: `Share your room code "${roomId}" with your friends to join`,
      });
    });

    socket.on("userJoin", ({ name }: { name: string }) => {
      toast({ title: `${name} joined the drawing board` });
    });

    socket.on("userLeave", ({ name }: { name: string }) => {
      toast({ title: `${name} joined the drawing board` });
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
        <DialogContent className="sm:max-w-[400px]">
          <Tabs defaultValue="account" className="w-[350px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="join">Join</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Create a room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Your name</Label>
                    <Input
                      id="username"
                      placeholder="Harvi"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" className="w-full" onClick={createRoom}>
                    Create
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="join">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Join a room</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div>
                      <Label htmlFor="username">Your name</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Harvi"
                        value={name}
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
                        onChange={(event) => setRoomId(event.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={joinRoom}>
                    Join
                  </Button>
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
