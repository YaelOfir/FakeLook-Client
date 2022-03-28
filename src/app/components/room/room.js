import React from "react";
import io from "socket-io-client";
function room({ match }) {
  const roomId = match.params.id;
  const socket = io("http://localhost:4002", {
    query: {
      token: localStorage.getItem("CC_Token"),
    },
  });
  return <div>room</div>;
}

export default room;
