import { IUserData } from "@/helper/interface/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserData = {
  name: "",
  roomId: "",
  userRole: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    leaveRoom: (state) => {
      state.roomId = "";
      state.userRole = "";
    },
  },
});

export const { setName, setRoomId, setUserRole, leaveRoom } = userSlice.actions;
export default userSlice.reducer;
