import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../auth-context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginUser = async (ev) => {
    ev.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
          navigate("/profile");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const loginGoogle = (ev) => {
    ev.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((response) => {
          const user = response.user;
          const data = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            createdAt: user.reloadUserInfo.createdAt,
            provider: response.providerId,
          };

          addDoc(collection(db, "users"), data);
          // setDoc(collection(db, "users", user.uid), data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  if (currentUser) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <>
      <h3>Sign in to your account</h3>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Your email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div>
          <input id="remember" type="checkbox" />

          <label htmlFor="remember">Remember me</label>
        </div>
        <a href="#">Forgot password?</a>
        <button type="submit">Sign in</button>
        <p>
          Don’t have an account yet? <Link to={"/register"}>Sign up</Link>
        </p>
      </form>

      <button onClick={loginGoogle}>Google</button>
    </>
  );
}

export default Login;
