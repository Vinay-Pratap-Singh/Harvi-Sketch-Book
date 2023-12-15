import { toast } from "@/components/ui/use-toast";
import { IInitialSocketState } from "@/helper/interface/interface";
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState: IInitialSocketState = {
  socket: null,
  name: "",
  roomId: "",
  userRole: "",
};

export const socketSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    connectSocket: (state) => {
      const mySocket = io(process.env.SERVER_URL || "http://localhost:5000");
      state.socket = mySocket;
    },
    createNewRoom: (state) => {
      if (!state.userRole && state.roomId && state.name) {
        toast({ title: "You are already in a room" });
        return;
      }
      const socket = state.socket;
      if (!socket) return;
      socket.emit("createRoom", { name: state.name });
      state.userRole = "admin";
    },
    joinNewRoom: (state) => {
      if (state.userRole && state.roomId && state.name) {
        toast({ title: "You are already in a room" });
        return;
      }
      const socket = state.socket;
      if (!socket) return;
      socket.emit("joinRoom", { roomId: state.roomId, name: state.name });
      state.userRole = "user";
    },
    deleteRoom: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket.removeAllListeners();
        state.socket = null;
      }
      state.name = "";
      state.roomId = "";
      state.userRole = "";
    },
  },
});

export const {
  connectSocket,
  createNewRoom,
  joinNewRoom,
  setName,
  setRoomId,
  deleteRoom,
} = socketSlice.actions;
export default socketSlice.reducer;
