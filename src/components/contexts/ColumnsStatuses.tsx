import React from "react";

export interface ColumnsStatus {
  name: string;
  color: string;
}

//ColumnsStatusesContextType to be passed as the type for the ColumnsStatusesContext that will be passed to most of the props
interface ColumnsStatusesContextType {
  columnsStatuses: ColumnsStatus[];
}

//create ColumnsStatuses context that will hold the 3 statuses "To Do", "In Progress", "Done"
export const ColumnsStatusesContext = React.createContext<ColumnsStatusesContextType | undefined>(undefined);

//columnsStatuses provider
export const ColumnsStatusesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const columnsStatuses = [
    { name: "To Do", color: "#f59e0b" },
    { name: "In Progress", color: "#4f46e5" },
    { name: "Done", color: "#22c55e" },
  ];
  return <ColumnsStatusesContext.Provider value={{ columnsStatuses }}>{children}</ColumnsStatusesContext.Provider>;
};
