import { Context } from "../types/Types";
import { createContext } from "react";

export const BurgerContext = createContext<Context | null>(null);