import {  useContext } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import CodenamesServiceContext from "../Codenames.context";

const CodenamesStartPage = () => {
  const codenamesService = useContext(CodenamesServiceContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartClick = async (event: any) => {
    event.preventDefault();
    console.log("click");
    const room = await codenamesService.getInitGameState();

    navigate(`${location.pathname}/${room}`);
  };

  return (
    <div>
      <button onClick={handleStartClick}>Start Game</button>
    </div>
  );
};

export default CodenamesStartPage;
