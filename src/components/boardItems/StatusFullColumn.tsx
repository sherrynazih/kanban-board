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

interface StatusFullColumnProps {
  status: ColumnsStatus;
}

const StatusFullColumn: React.FC<StatusFullColumnProps> = ({ status }) => {
  const dashboardCards = useSelector((state: RootState) => state.dashboard.cards);
  const dispatch = useDispatch();

  const filteredCardByStatus = dashboardCards?.filter((c) => c.status.name === status.name);

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    const card = filteredCardByStatus[index];
    return (
      <div style={style}>
        <ItemCard card={card} />
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

  return (
    <div ref={dropRef} className="column-container">
      <div className="column-header-container">
        <h4>{status.name}</h4>
        <Button
          className="add-card-icon"
          onClick={() =>
            dispatch(
              reducers.addCard({
                id: new Date().getTime(),
                title: "test",
                description: "test desc",
                assignedTo: "Sherry Nazih",
                status: {
                  name: status.name,
                  color: status.color,
                },
              })
            )
          }
        >
          <ControlPointIcon />
        </Button>
      </div>

      {/* Virtualized List */}
      <List height={500} itemCount={filteredCardByStatus.length} itemSize={200} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default StatusFullColumn;
