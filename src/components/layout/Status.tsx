import { ColumnsStatus } from "../contexts/ColumnsStatuses";

const Status: React.FC<ColumnsStatus> = ({ name, color }) => {
  return (
    <div className="status-div">
      <div className="status-color" style={{ backgroundColor: color }} />
      <div className="status-name">{name}</div>
    </div>
  );
};

export default Status;
