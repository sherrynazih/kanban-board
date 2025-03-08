import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../card/cardSlice";
import { ColumnsStatus } from "../../components/contexts/ColumnsStatuses";

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
    deleteCard: (state, action: PayloadAction<{ id: number }>) => {
      state.cards = state.cards.filter((c) => c.id !== action.payload.id);
    },
    editCard: (state, action: PayloadAction<Card>) => {
      let card = state.cards.find((c) => c.id === action.payload.id);
      if (card) {
        card = action.payload;
      }
    },
    updateCardUser: (state, action: PayloadAction<{ id: number; newUser: string }>) => {
      const card = state.cards.find((c) => c.id === action.payload.id);
      if (card) {
        card.assignedTo = action.payload.newUser;
      }
    },
    updateCardStatus: (state, action: PayloadAction<{ id: number; newStatus: ColumnsStatus }>) => {
      const card = state.cards.find((c) => c.id === action.payload.id);
      if (card) {
        card.status = action.payload.newStatus;
      }
    },
  },
});

export const reducers = dashboardSlice.actions;

export default dashboardSlice.reducer;
