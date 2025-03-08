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
  const theme = useTheme();
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

  const filteredCardByStatus = dashboardCards?.filter((c) => c.status.name === status.name);

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const card = filteredCardByStatus[index];
    return (
      <div style={style} onClick={() => handleClickOpenCard(card)}>
        <ItemCard card={card} usersOptions={usersOptions} />
      </div>
    );
  };

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
      style={theme.palette.mode === "dark" ? { filter: "invert(1)" } : { filter: "" }}
      ref={dropRef}
      className="column-container"
    >
      <div className="column-header-container">
        <h4 style={theme.palette.mode === "dark" ? { filter: "invert(1)" } : { filter: "" }}>
          {status.name}
        </h4>
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

      {/* Virtualized List */}
      <List height={500} itemCount={filteredCardByStatus.length} itemSize={205} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default StatusFullColumn;
