import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardLayoutBasic from "./components/layout/DashboardLayout";
import { Provider } from "react-redux";
import { ColumnsStatusesProvider } from "./components/contexts/ColumnsStatuses";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <ColumnsStatusesProvider>
            <DashboardLayoutBasic />
          </ColumnsStatusesProvider>
        </DndProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
