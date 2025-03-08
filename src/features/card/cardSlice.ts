import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnsStatus } from "../../components/contexts/ColumnsStatuses";

export interface Card {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: ColumnsStatus;
}

const initialState: Card = {
  id: 0,
  title: "",
  description: "",
  assignedTo: "",
  status: {
    name: "To Do",
    color: "#f59e0b",
  },
};

export const cardSlice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {
    editCard: (state, action: PayloadAction<Card>) => {
      state = action.payload;
    },
  },
});

export const reducers = cardSlice.actions;

export default cardSlice.reducer;
