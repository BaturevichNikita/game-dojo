import { createContext } from "react";
import GamesService from "./games.service";

const GamesServiceContext = createContext(GamesService);
export default GamesServiceContext;
