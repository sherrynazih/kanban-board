import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import StatusFullColumn from "../boardItems/StatusFullColumn";
import { ColumnsStatusesContext } from "../contexts/ColumnsStatuses";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard", //This is the only thing used right now
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "tasks", //Empty for now, not used
    title: "Tasks",
    icon: <FormatListBulletedIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "users", //Empty for now, not used
    title: "Users",
    icon: <PeopleIcon />,
  },
  {
    segment: "settings", //Empty for now, not used
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    segment: "help", //Empty for now, not used
    title: "Help & Support",
    icon: <HelpIcon />,
  },
];

//This is mainly from Material UI to enable dark/light theme and also responsible on making the website responsive
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

//Not used right now as we have only one page
function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/dashboard");

  const statuses = React.useContext(ColumnsStatusesContext); //Accessed statuses used in the created context.

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="https://www.rescounts.com/static/media/logo%20gray.39ad533e10c97f72154a.png"
            alt="Rescounts logo"
          />
        ),
        title: "",
        homeUrl: "/",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer title="Kanban Board">
          <Grid container spacing={3}>
            {statuses?.columnsStatuses.map((s, si) => (
              //size attr. is due to responsiveness of the website
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={`column-status-${si}`}>
                <StatusFullColumn status={s} />
              </Grid>
            ))}
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
