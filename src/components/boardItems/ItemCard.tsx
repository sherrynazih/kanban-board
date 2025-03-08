import Status from "../layout/Status";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Card } from "../../features/card/cardSlice";
import { useDrag } from "react-dnd";

interface CardProps {
  card: Card;
}

const ItemCard: React.FC<CardProps> = ({ card }) => {
  const usersOptions = ["Sherry Nazih", "John Tadros"];

  const [value, setValue] = React.useState<string | "">("");

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, status: card.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = React.useRef<HTMLDivElement>(null);

  drag(dragRef);

  return (
    <div ref={dragRef} className="card-container" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="card-title">{card.title}</div>
      <div className="card-description">{card.description.slice(0, 60) + "..."}</div>
      <Status name={card.status.name} color={card.status.color} />
      <div className="assignedto-container">
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="user-card-selection">Assigned To</InputLabel>
          <Select
            labelId="user-card-selection"
            value={value}
            label="Assigned To"
            onChange={(e) => setValue(e.target.value)}
            MenuProps={{
              sx: {
                "& .MuiPaper-root": {
                  minWidth: "120px", //matches the input
                  width: "auto",
                  mt: 1,
                },
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {usersOptions.map((u, ui) => (
              <MenuItem key={`user-option-${ui}`} value={u}>
                {u}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ItemCard;
