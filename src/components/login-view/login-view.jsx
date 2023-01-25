import { useState } from "react";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    try {
      const queryParams = `?username=${username}&password=${password}`;
      const response = await fetch(
        `https://myflixapi.smartcoder.dev/v1/users/login${queryParams}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message, data } = await response.json();
      if (data) {
        localStorage.setItem("user", username);
        localStorage.setItem("token", data.token);
        onLoggedIn(username, data.token);
      } else if (success) {
        alert(message);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(error) => setUsername(error.target.value)}
          minLength="3"
          maxLength="20"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(error) => setPassword(error.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginView;
