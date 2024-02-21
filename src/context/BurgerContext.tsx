import { context } from "../types/Types";
import { createContext } from "react";

export const BurgerContext = createContext<context | null>(null);