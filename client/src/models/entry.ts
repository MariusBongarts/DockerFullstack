import { color } from "./color";

export interface Entry {
  title: string,
  color?: color,
  startDate: Date;
  endDate: Date
}