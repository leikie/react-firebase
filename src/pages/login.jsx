import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (ev) => {
    ev.preventDefault();
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

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
    </>
  );
}

export default Login;
