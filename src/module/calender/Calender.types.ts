import { type Moment } from "moment";

export type CalenderType = "jalali" | "gregorian";
export interface CalendarConstructor {
  date?: Moment;
  calenderType: CalenderType;
}
