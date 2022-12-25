import { createContext } from "react";
import CodenamesService from "./Codenames.service";

const CodenamesServiceContext = createContext(CodenamesService);
export default CodenamesServiceContext;
