import { IInitialCanvasState } from "@/helper/interface/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialCanvasState = {
  currentCanvasIndex: 0,
  allCanvasImageData: [],
  canvas: null,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    //   PayloadAction<HTMLCanvasElement>
    setCanvas: (state, action) => {
      state.canvas = action.payload;
      state.currentCanvasIndex = 0;
    },

    addCanvasImageData: (state) => {
      if (!state.canvas) return;
      const context = state.canvas.getContext("2d");
      if (!context) return;
      const currentState = context.getImageData(
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
      state.allCanvasImageData.push(currentState);
      state.currentCanvasIndex = state.allCanvasImageData.length - 1;
    },

    renderCanvas: (state) => {
      if (!state.canvas) return;
      const context = state.canvas.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.putImageData(
        state.allCanvasImageData[state.currentCanvasIndex],
        0,
        0
      );
    },

    undoOperation: (state) => {
      if (state.currentCanvasIndex > 0) {
        state.currentCanvasIndex = state.currentCanvasIndex - 1;
      }
    },

    redoOperation: (state) => {
      if (state.currentCanvasIndex < state.allCanvasImageData.length - 1) {
        state.currentCanvasIndex = state.currentCanvasIndex + 1;
      }
    },
  },
});

export const {
  setCanvas,
  addCanvasImageData,
  renderCanvas,
  undoOperation,
  redoOperation,
} = canvasSlice.actions;
export default canvasSlice.reducer;
