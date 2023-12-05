import { ILineStroke } from "@/helper/interface/interface";
import { createSlice } from "@reduxjs/toolkit";

type IInitialState = {
  isCanvasLocked: boolean;
  currentShape: string | null;
  currentOperation: string | null;
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: ILineStroke;
  sketchBookBackground: string;
};

const initialState: IInitialState = {
  isCanvasLocked: false,
  currentShape: null,
  currentOperation: null,
  strokeColor: "#000000",
  strokeWidth: 1,
  strokeStyle: {
    name: "normal",
    content: "-",
    value: null,
  },
  sketchBookBackground: "#FFFFFF",
};

export const toolkitSlice = createSlice({
  name: "toolkit",
  initialState,
  reducers: {
    setStrokeColor: (state, action) => {
      state.strokeColor = action.payload;
    },
    setSketchBookBackgroundColor: (state, action) => {
      state.sketchBookBackground = action.payload;
    },
    toggleCanvasLock: (state, action) => {
      state.isCanvasLocked = action.payload;
      if (state.isCanvasLocked) {
        state.currentShape = null;
      }
    },
    setCurrentShape: (state, action) => {
      state.currentShape = action.payload;
    },
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload;
    },
    setStrokeStyle: (state, action) => {
      state.strokeStyle = { ...action.payload };
    },
  },
});

export const {
  setStrokeColor,
  setSketchBookBackgroundColor,
  toggleCanvasLock,
  setCurrentShape,
  setStrokeWidth,
  setStrokeStyle,
} = toolkitSlice.actions;
export default toolkitSlice.reducer;
