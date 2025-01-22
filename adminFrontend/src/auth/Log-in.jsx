import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = { email, password };
    fetch("http://localhost:3000/log-in", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          setEmail("");
          setPassword("");
          alert("Invalid credentials");
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.user.is_admin, " is admin");

        if (data.user.is_admin == true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);
          navigate("/");
        } else {
          setEmail("");
          setPassword("");
          alert("this user is not admin!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>
        To make process easier here is one admin user, use this data to log in
      </h2>
      <h2>email: admin123@gmail.com</h2>
      <h2>passord: admin123</h2>
      <form onSubmit={handleLogin}>
        <div>
          email
          <input
            type="text"
            value={email}
            name="Username"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LogIn;
