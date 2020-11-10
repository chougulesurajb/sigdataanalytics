import React, { useState } from "react";
import axios from "axios";

function Login({ handleLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = () => {
    const payload = { email, password, rememberMe };
    axios
      .post("https://sigviewauth.sigmoid.io/signIn", payload)
      .then((res) => {
        // console.log("res", res.data);
        if (res.data && res.data.token) {
          sessionStorage.setItem("appToken", res.data.token);
        }
        handleLoggedIn(true);
      })
      .catch((error) => {
        handleLoggedIn(false);
        console.log(error);
      });
  };
  const token = sessionStorage.getItem("appToken");

  if (token) {
    handleLoggedIn(true);
  }
  return (
    <div className="login">
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="email">Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span htmlFor="email">Remember me:</span>
      <input
        name="rememberme"
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      <button onClick={onLogin}>Log In</button>
    </div>
  );
}

export default Login;
