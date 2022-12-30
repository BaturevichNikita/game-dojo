import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import Board from "./Board/Board";
import CodenamesServiceContext from "../Codenames.context";
import { GameState } from "../models";

const Codenames = () => {
  const [state, setState] = React.useState({} as GameState);
  const codenamesService = useContext(CodenamesServiceContext);
  let socket:Socket;

  const { room } = useParams();

  useEffect(() => {
    socket = socketIOClient("ws://localhost:3000/codenames");
  }, [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket.io connection opened");
      const payload = {
        nickname: "name",
        team: "red",
        room: room,
      };
      socket.emit("joinRoom", payload);
    });

    socket.on("joinedRoom", (data) => {
      console.log(data.state);
      setState(data.state);
    });

    socket.on("disconnect", () => {
      console.log("Socket.io connection closed");
    });
  }, []);

  const handleClick = (name: string) => {
    socket.emit("message", { room: room, message: { name } });
  };

  return (
    <div className="codenames-container">
      <Board words={state.words || []} handleClick={handleClick} />
    </div>
  );
};

export default Codenames;
