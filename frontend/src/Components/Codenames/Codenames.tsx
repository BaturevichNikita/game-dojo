import React from "react";
import Board from "./Board/Board";

const Codenames = () => {
  const [dictionary, setDictionary] = React.useState([]);

  return (
    <div className="codenames-container">
      <Board
        dictionary={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
        ]}
      />
    </div>
  );
};

export default Codenames;
