import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

interface UserData {
  id: string;
  email: string;
  
}

interface UserContextType {
  userToken: string | null;
  userData: UserData | null;
  setUserToken: (token: string | null) => void;
}

export const userContext = createContext<UserContextType | null>(null);

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      const decoded = jwtDecode<UserData>(token);
      setUserData(decoded);
    }
  }, []); 

  
  useEffect(() => {
    if (userToken) {
      const decoded = jwtDecode<UserData>(userToken);
      setUserData(decoded);
      localStorage.setItem("token", userToken);
    } else {
      setUserData(null);
      localStorage.removeItem("token");
    }
  }, [userToken]);

  return (
    <userContext.Provider value={{ userToken, userData, setUserToken }}>
      {children}
    </userContext.Provider>
  );
}