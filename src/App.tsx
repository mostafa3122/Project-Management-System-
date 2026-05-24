import { ToastContainer } from "react-toastify";
import "./App.css";
import Routes from "./Routes/Routes";
import UserContextProvider from "./context/userContext";
import ThemeContextProvider from "./context/ThemeContext";


function App() {
  return (
    <>
      <ThemeContextProvider>
        <UserContextProvider>
          <Routes />
          <ToastContainer position="top-right" autoClose={3000} />
        </UserContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
