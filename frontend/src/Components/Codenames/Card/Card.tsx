import React from "react";

import "./Card.css";

interface Props {
  word: string;
}

const CodenamesCard = ({ word }: Props) => {
  return (
    <div className="codenames-card">
      <p className="codenames-word">{word}</p>
    </div>
  );
};

export default CodenamesCard;
