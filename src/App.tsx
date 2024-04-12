import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./pages";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppThemeProvider>
          <Login>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Login>
        </AppThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
