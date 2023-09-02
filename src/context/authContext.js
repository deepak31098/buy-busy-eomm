import {createContext, useContext, useEffect, useState} from "react";
import {getUserAuth} from "../services/user";
import {useLoading} from "./loadingContext";

// create context
const authContext = createContext();
// custom hook
export const useAuth = () => useContext(authContext);

// provide user context
export function AuthContextProvider({children}) {
  const {showSpinner, hideSpinner} = useLoading();
  const [user, setUser] = useState(null);
  const handleAuthStateChange = user => {
    hideSpinner();
    setUser(user);
  };

  useEffect(() => {
    showSpinner();
    getUserAuth(handleAuthStateChange);
  }, []);

  return <authContext.Provider value={user}> {children}</authContext.Provider>;
}
