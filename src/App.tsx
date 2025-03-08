import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import DashboardLayoutBasic from "./components/layout/DashboardLayout";
import { Provider } from "react-redux";
import { ColumnsStatusesProvider } from "./components/contexts/ColumnsStatuses";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <CssBaseline />
        <ColumnsStatusesProvider>
          <DashboardLayoutBasic />
        </ColumnsStatusesProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
