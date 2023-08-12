import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../auth-context";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          const data = {
            uid: user.uid,
            displayName: name,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            createdAt: user.reloadUserInfo.createdAt,
            provider: "password",
            timeStamp: serverTimestamp(),
          };

          addDoc(collection(db, "users"), data);
          // await setDoc(doc(db, "users", user.uid), data);
          navigate("/login");
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

  if (currentUser) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <>
      <h3>Create and account</h3>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="fullname"
          />
        </div>
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
          <input id="terms" type="checkbox" />

          <label htmlFor="terms">
            I accept the <a href="#">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit">Create an account</button>
        <p>
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </>
  );
}

export default Register;
