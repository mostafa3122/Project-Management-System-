import "./App.css";
import Routes from "./Routes/Routes";
import UserContextProvider from "./context/userContext";
import Header from "./shared/Header/Header";

function App() {
  return (
    <>
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
      
      
    </>
  );
}

export default App;
