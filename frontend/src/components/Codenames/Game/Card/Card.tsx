import React from "react";

import "./Card.css";

interface Props {
  name: string;
  color: string;
  isCovered: boolean;
  handleClick: any;
}

const CodenamesCard = ({ name, color, isCovered, handleClick }: Props) => {
  return (
    <div
      className="codenames-card"
      onClick={() => {
        console.log("clickOn: ", name);
        handleClick(name);
      }}
    >
      <p className="codenames-word">{`${name} ${color} ${isCovered}`}</p>
    </div>
  );
};

export default CodenamesCard;
