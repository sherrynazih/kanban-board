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
    //addCard: used when a new item/card is created
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    //deleteCard: used to delete card
    deleteCard: (state, action: PayloadAction<{ id: number }>) => {
      state.cards = state.cards.filter((c) => c.id !== action.payload.id);
    },
    //editCard: used to edit an existing card when the form is opened and update fields
    editCard: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload };
      }
    },
    //updateCardUser: used to update assigned to field only without opening the item/card
    updateCardUser: (state, action: PayloadAction<{ id: number; newUser: string }>) => {
      const card = state.cards.find((c) => c.id === action.payload.id);
      if (card) {
        card.assignedTo = action.payload.newUser;
      }
    },
    //updateCardUser: used to update item/card's status when dragged and dropped to another column with different status
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
