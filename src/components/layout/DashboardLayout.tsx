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
import { useTheme } from "@mui/material/styles";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "tasks",
    title: "Tasks",
    icon: <FormatListBulletedIcon />,
  },
  {
    kind: "divider",
  },
  {
    segment: "users",
    title: "Users",
    icon: <PeopleIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
  {
    segment: "help",
    title: "Help & Support",
    icon: <HelpIcon />,
  },
];

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

  const theme = useTheme();

  console.info("theme", theme);

  const statuses = React.useContext(ColumnsStatusesContext);

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
