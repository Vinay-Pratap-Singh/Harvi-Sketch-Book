import { IInitialCanvasState } from "@/helper/interface/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IInitialCanvasState = {
  currentCanvasIndex: -1,
  allCanvasImageData: [],
  canvas: null,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action) => {
      state.canvas = action.payload;
      state.currentCanvasIndex = 0;
    },

    applySketchBookBackgroundColor: (state, action: PayloadAction<string>) => {
      if (!state.canvas) return;
      const context = state.canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = action.payload;
      context.fillRect(0, 0, state.canvas.width, state.canvas.height);
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
      if (state.currentCanvasIndex > 1) {
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
  applySketchBookBackgroundColor,
  addCanvasImageData,
  renderCanvas,
  undoOperation,
  redoOperation,
} = canvasSlice.actions;
export default canvasSlice.reducer;
