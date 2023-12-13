import { IInitialSocketState } from "@/helper/interface/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialSocketState = {
  isAdmin: false,
};

export const socketSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {},
});

export const {} = socketSlice.actions;
export default socketSlice.reducer;
