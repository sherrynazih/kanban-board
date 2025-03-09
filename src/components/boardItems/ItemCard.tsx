import Status from "../layout/Status";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Card } from "../../features/card/cardSlice";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { reducers as dashboardReducers, reducers } from "../../features/dashboard/dashboardSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

interface CardProps {
  card: Card;
  usersOptions: string[];
}

const ItemCard: React.FC<CardProps> = ({ card, usersOptions }) => {
  const dispatch = useDispatch();
  const theme = useTheme(); //Get theme data/info and accordingly adjust styling

  const [value, setValue] = React.useState<string | "">(card.assignedTo ?? "");

  //Dragging technology applied on cards
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, status: card.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (e: any) => {
    e.stopPropagation(); //Stop opening the modal when assigned to is changed or clicked on.
    setValue(e.target.value);
  };

  //Update assigned to when a new user is selected
  React.useEffect(() => {
    if (!value || value !== card.assignedTo) {
      dispatch(dashboardReducers.updateCardUser({ id: card.id, newUser: value }));
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleChange({ target: { value } });
    }
  };

  const dragRef = React.useRef<HTMLDivElement>(null);

  drag(dragRef);

  return (
    <div ref={dragRef} className="card-container" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Button
        className="delete-card-icon"
        onClick={(e: any) => {
          e.stopPropagation(); //Stop opening the modal when delete icon is clicked.
          dispatch(
            reducers.deleteCard({
              id: card.id,
            })
          );
        }}
      >
        <DeleteIcon />
      </Button>
      <div className="card-title">{card.title}</div>
      {/* slice to 60 characters to handle large paragraphs in the description */}
      <div className="card-description">{card.description.slice(0, 60) + "..."}</div>
      {/* Status component to handle status color beside name and be called afterwards anywhere */}
      <Status name={card.status.name} color={card.status.color} />
      <div
        style={theme.palette.mode === "dark" ? { filter: "invert(1)" } : { filter: "" }} //Handle invert colors on theme change
        className="assignedto-container"
        onClick={(e) => e.stopPropagation()} //Stop opening the modal when assigned to is changed or clicked on.
      >
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="user-card-selection">Assigned To</InputLabel>
          <Select
            labelId="user-card-selection"
            value={value}
            label="Assigned To"
            onChange={handleChange}
            inputProps={{
              onKeyDown: handleKeyDown,
            }}
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
