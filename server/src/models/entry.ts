import { Entity } from "./entity";

export interface Entry extends Entity {
  title: string,
  startDate: Date;
  endDate: Date
}