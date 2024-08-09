import type { CalenderType } from "./Calender.types";
import { type Moment } from "moment";
export abstract class BaseCalender {
  abstract setCalenderType<T extends CalenderType>(type: T): void;
  abstract getCurrentMonth(): string;
  abstract getStartOfMonth<T extends Moment>(): T;
  abstract getEndOfMonth<T extends Moment>(): T;
  abstract getStartOfCalendar<T extends Moment>(): T;
  abstract getEndOfCalendar<T extends Moment>(): T;
  abstract getCalendar<T extends Moment>(): {
    date: T;
    inCurrentMonth: boolean;
    isCurrentDate: boolean;
  }[][];
  abstract prevMonth(): void;
  abstract nextMonth(): void;
}
