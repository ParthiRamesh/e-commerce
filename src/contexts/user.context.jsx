import { createContext, useState, useEffect } from "react";
import {
  createUserDocFromAuth,
  OnAuthStateChangedHandler,
} from "../utils/firebase/firebase.util";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    OnAuthStateChangedHandler((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
