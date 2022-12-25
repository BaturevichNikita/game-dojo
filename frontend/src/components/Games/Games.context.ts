import { createContext } from "react";
import GamesService from "./Games.service";

const GamesServiceContext = createContext(GamesService);
export default GamesServiceContext;
