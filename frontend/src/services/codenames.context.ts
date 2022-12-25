import { createContext } from "react";
import CodenamesService from "./codenames.service";

const CodenamesServiceContext = createContext(CodenamesService);
export default CodenamesServiceContext;
