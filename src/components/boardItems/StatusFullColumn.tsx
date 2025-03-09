import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ItemCard from "./ItemCard";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { reducers } from "../../features/dashboard/dashboardSlice";
import { Button } from "@mui/material";
import { ColumnsStatus } from "../contexts/ColumnsStatuses";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useDrop } from "react-dnd";
import React from "react";
import CardForm from "./CardForm";
import { Card } from "../../features/card/cardSlice";
import { useTheme } from "@mui/material/styles";

interface StatusFullColumnProps {
  status: ColumnsStatus;
}

const StatusFullColumn: React.FC<StatusFullColumnProps> = ({ status }) => {
  const dashboardCards = useSelector((state: RootState) => state.dashboard.cards);
  const dispatch = useDispatch();
  const theme = useTheme(); //Get theme data/info and accordingly adjust styling
  const [openCard, setOpenCard] = React.useState<boolean>(false);
  const [selectedCard, setSelectedCard] = React.useState<Card | null>(null);
  const usersOptions = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "David Brown",
    "Sophia Wilson",
    "James Taylor",
    "Olivia Anderson",
    "William Thomas",
    "Isabella Martinez",
  ];

  const filteredCardByStatus = dashboardCards?.filter((c) => c.status.name === status.name); //Show each status in the column with the same status

  //Handle listing cards with virtualized list react technology
  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const card = filteredCardByStatus[index];
    return (
      <div style={style} onClick={() => handleClickOpenCard(card)}>
        <ItemCard card={card} usersOptions={usersOptions} />
      </div>
    );
  };

  //When card is dragged and dropped, if new column, updateCardStatus action is called to update the status as the targeted column.
  const [_, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedCard: { id: number; status: ColumnsStatus }) => {
      dispatch(reducers.updateCardStatus({ id: draggedCard.id, newStatus: status }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dropRef = React.useRef<HTMLDivElement>(null);

  drop(dropRef);

  const handleClickOpenCard = (card: Card | null) => {
    setSelectedCard(card);
    setOpenCard(true);
  };

  const handleCloseCard = () => {
    setSelectedCard(null);
    setOpenCard(false);
  };

  return (
    <div
      style={theme.palette.mode === "dark" ? { filter: "invert(1)" } : { filter: "" }} //Handle invert colors on theme change
      ref={dropRef}
      className="column-container"
    >
      <div className="column-header-container">
        {/* //Handle invert colors on theme change */}
        <h4 style={theme.palette.mode === "dark" ? { filter: "invert(1)" } : { filter: "" }}>
          {status.name}
        </h4>
        {/* If add new, handleClickOpenCard will take null to be with empty fields on open */}
        <Button className="add-card-icon" onClick={() => handleClickOpenCard(null)}>
          <ControlPointIcon />
        </Button>

        <CardForm
          open={openCard}
          handleCloseCard={handleCloseCard}
          status={status}
          usersOptions={usersOptions}
          selectedCard={selectedCard}
        />
      </div>

      {/* Virtualized List when scrolling */}
      <List height={500} itemCount={filteredCardByStatus.length} itemSize={205} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default StatusFullColumn;
