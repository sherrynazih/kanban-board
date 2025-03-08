import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../card/cardSlice";

interface Dashboard {
  cards: Card[];
}

const initialState: Dashboard = {
  cards: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action: PayloadAction<Card>) => {
      state.cards.filter((c) => c.id !== action.payload.id);
    },
  },
});

export const reducers = dashboardSlice.actions;

export default dashboardSlice.reducer;
