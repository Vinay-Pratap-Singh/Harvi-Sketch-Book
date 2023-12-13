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
import { useAppSelector } from "@/hooks/redux";
import React, { useState } from "react";

const LiveCollaboration = () => {
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
                    <Input id="username" placeholder="Harvi" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="button" className="w-full">
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
                      <Input id="username" type="text" placeholder="Harvi" />
                    </div>
                    <div>
                      <Label htmlFor="roomcode">Room ID</Label>
                      <Input
                        id="roomcode"
                        type="text"
                        placeholder="Room code"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join</Button>
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
