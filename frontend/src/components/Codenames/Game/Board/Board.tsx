import React from "react";
import { Word } from "../../models";
import Card from "../Card/Card";
import "./Board.css";

interface Props {
  dictionary: Word[];
}

const Board = ({ dictionary }: Props) => {
  return (
    <div className="codenames-board">
      {dictionary.map((w: Word) => (
        <Card key={w.name} word={w.name} />
      ))}
    </div>
  );
};

export default Board;
