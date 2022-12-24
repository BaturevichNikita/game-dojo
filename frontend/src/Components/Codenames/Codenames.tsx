import React, { useContext, useEffect } from "react";
import Board from "./Board/Board";

import CodenamesServiceContext from "../../services/codenames.context";

const Codenames = () => {
  const [dictionary, setDictionary] = React.useState([] as string[]);

  const codenamesService = useContext(CodenamesServiceContext);

  useEffect(() => {
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
