import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./config/firebase";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      let data = null;
      if (user) {
        data = {
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
          createdAt: user.reloadUserInfo.createdAt,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        };
      }

      localStorage.setItem("user", JSON.stringify(data));
      setCurrentUser(data);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
