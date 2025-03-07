import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./themes/modes";
import DashboardLayoutBasic from "./components/layout/DashboardLayout";
import { Provider } from "react-redux";
import store from "./app/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <DashboardLayoutBasic />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
