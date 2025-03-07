import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/card/cardSlice";

export default configureStore({
  reducer: {
    card: cardReducer,
  },
  devTools: true, // Enable DevTools -- For Safari on Macbook
});
