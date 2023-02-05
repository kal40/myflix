import React from "react";

function UserInfo({ email, username }) {
  return (
    <React.Fragment>
      <p>User: {username}</p>
      <p>Email: {email}</p>
    </React.Fragment>
  );
}

export default UserInfo;
