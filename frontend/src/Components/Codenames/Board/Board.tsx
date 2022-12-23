import React from "react";
import Card from "../Card/Card";
import "./Board.css";

interface Props {
  dictionary: string[];
}

const Board = ({ dictionary }: Props) => {
  return (
    <div className="codenames-board">
      {dictionary.map((w: string) => (
        <Card word={w} />
      ))}
    </div>
  );
};

export default Board;
