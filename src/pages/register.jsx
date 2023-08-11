import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

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
