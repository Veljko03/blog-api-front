import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
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
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);

          //setUser(data.user);
          navigate("/");
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
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
      <h4>
        Dont have account? <Link to={"/sign-in"}>Sign in</Link>
      </h4>
    </div>
  );
};

export default LogIn;
