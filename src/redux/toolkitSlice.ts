import { FONT_TYPE, STROKE_LINE_STYLE } from "@/constants/constants";
import { IInitialToolkitState } from "@/helper/interface/interface";

import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialToolkitState = {
  isCanvasLocked: false,
  currentShape: null,
  currentOperation: null,
  strokeColor: "#000000",
  strokeWidth: 1,
  strokeStyle: { ...STROKE_LINE_STYLE[0] },
  sketchBookBackground: "#FFFFFF",
  shapeFillColor: "#FFFFFF",
  fontType: FONT_TYPE[0].name,
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
      state.shapeFillColor = action.payload;
    },
    setShapeFillColor: (state, action) => {
      state.shapeFillColor = action.payload;
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
    setFontType: (state, action) => {
      state.fontType = action.payload;
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
  setShapeFillColor,
  setFontType,
} = toolkitSlice.actions;
export default toolkitSlice.reducer;
