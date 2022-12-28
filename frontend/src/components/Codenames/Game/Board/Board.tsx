import React from "react";
import { Word } from "../../models";
import Card from "../Card/Card";
import "./Board.css";

interface Props {
  words: Word[];
  handleClick: any;
}

const Board = ({ words, handleClick }: Props) => {
  console.log("board: ", words);
  return (
    <div className="codenames-board">
      {words.map((w: Word) => (
        <Card
          key={w.name}
          name={w.name}
          color={w.color}
          isCovered={w.isCovered}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Board;
