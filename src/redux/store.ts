import { configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      toolkit: toolkitSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
