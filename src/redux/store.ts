import { configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";
import canvasSlice from "./canvasSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      toolkit: toolkitSlice,
      canvas: canvasSlice,
    },
    // for disabling the serialization check of data
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
