import { ToastContainer } from "react-toastify";
import "./App.css";
import Routes from "./Routes/Routes";
import UserContextProvider from "./context/userContext";
import Header from "./shared/Header/Header";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes />
        <ToastContainer position="top-right" autoClose={3000} />
      </UserContextProvider>
    </>
  );
}

export default App;
