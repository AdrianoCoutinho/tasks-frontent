import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#101116",
      dark: "red",
      light: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00E074",
      dark: "#05f581",
      light: cyan[300],
      contrastText: "#1C212C",
    },
    background: {
      default: "#101116",
      paper: "#212836",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
