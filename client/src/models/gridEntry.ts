import { color } from "./color";
import { Entry } from "./entry";

export interface GridEntry extends Entry  {
  gridRow: number;
  gridColumnStart: number;
  gridColumnEnd: number;
}