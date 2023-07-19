import "./App.css";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import { router } from "./router";
import CircularProgress from "@mui/material/CircularProgress";
import createPalette from "@mui/material/styles/createPalette";
import {store,persistor} from "./store/store"

let theme = createTheme({
  palette: {
    primary: {
      main: "#FD9340",

    },

  },
  typography: {
    fontFamily: "'Kanit', sans-serif",
  },breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <RouterProvider router={router} fallbackElement={<CircularProgress />} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
