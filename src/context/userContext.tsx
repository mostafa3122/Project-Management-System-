import { createContext, useEffect, useState } from "react";
// Import your axios client
import axiosClient from "../services/api/axiosClient"; 

interface UserData {
  id?: string;
  userName?: string;
  email?: string;
  profileImage?: string;
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

  
  const getCurrentUser = async () => {
    try {
      const response = await axiosClient.get("/Users/currentUser"); 
      setUserData(response.data); 
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []); 

  
  useEffect(() => {
    if (userToken) {
      localStorage.setItem("token", userToken);
      getCurrentUser(); 
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
