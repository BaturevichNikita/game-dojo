import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";

import Board from "./Board/Board";

import CodenamesServiceContext from "../Codenames.context";
import { GameState, Word } from "../models";

const Codenames = () => {
  const [state, setState] = React.useState({} as GameState);
  const codenamesService = useContext(CodenamesServiceContext);
  const dataFetchedRef = useRef(false); // to avoid call useEffect twice
  const socket = useRef(socketIOClient("ws://localhost:3000/codenames"));

  const { room } = useParams();

  useEffect(() => {
    // to avoid call useEffect twice
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    socket.current.on("connect", () => {
      console.log("Socket.io connection opened");
      const payload = {
        nickname: "name",
        team: "red",
        room: room,
      };
      socket.current.emit("joinRoom", payload);
    });

    socket.current.on("joinedRoom", (data) => {
      console.log(data.state);
      setState(data.state);
    });

    socket.current.on("disconnect", () => {
      console.log("Socket.io connection closed");
    });
  }, []);

  const handleClick = (name: string) => {
    socket.current.emit("message", { room: room, message: { name } });
  };

  return (
    <div className="codenames-container">
      <Board words={state.words ?? ([] as Word[])} handleClick={handleClick} />
    </div>
  );
};

export default Codenames;
