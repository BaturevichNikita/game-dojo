import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Board from "./Board/Board";

import CodenamesServiceContext from "../Codenames.context";
import { Word } from "../models";

const Codenames = () => {
  const [dictionary, setDictionary] = React.useState([] as Word[]);
  const codenamesService = useContext(CodenamesServiceContext);
  const dataFetchedRef = useRef(false); // to avoid call useEffect twice

  const { room } = useParams();

  useEffect(() => {
    // to avoid call useEffect twice
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const loadWords = async () => {
      const state = await codenamesService.getInitGameState();
      setDictionary(state.words);
    };
    loadWords();
  }, []);

  return (
    <div className="codenames-container">
      <Board dictionary={dictionary} />
    </div>
  );
};

export default Codenames;
