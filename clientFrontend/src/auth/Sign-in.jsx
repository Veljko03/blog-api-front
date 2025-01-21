import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    if (confirm != password) {
      alert("passwords do not match");
      return;
    }
    const user = { email, username, password };
    fetch("http://localhost:3000/sign-in", {
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
          setUsername("");
          setConfirm("");
          alert("Invalid credentials");
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          navigate("/log-in");
        } else {
          throw new Error("Login failed: no token provided");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSignIn}>
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
          user name
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
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
        <div>
          confirm password
          <input
            type="password"
            value={confirm}
            name="Password"
            onChange={({ target }) => setConfirm(target.value)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <h4>
        Allready have account? <Link to={"/log-in"}>Sign in</Link>
      </h4>
    </div>
  );
};

export default SignIn;
