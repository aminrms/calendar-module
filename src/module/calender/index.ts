import moment, { type Moment } from "moment-jalaali";
import type { CalendarConstructor, CalenderType } from "./Calender.types";
import { BaseCalender } from "./BaseCalender";

class Calender extends BaseCalender {
  type: CalenderType = "jalali";
  currentDate: Moment = moment();

  constructor({
    date = moment(),
    calenderType = "jalali",
  }: CalendarConstructor) {
    super();
    this.currentDate = date;
    this.type = calenderType;
  }

  setCalenderType<T extends CalenderType>(type: T): void {
    this.type = type;
  }

  getCurrentMonth = () => {
    if (this.type === "jalali") {
      return this.currentDate.format("jMMMM jYYYY");
    } else {
      return this.currentDate.format("MMMM YYYY");
    }
  };

  getStartOfMonth = <T extends Moment>(): T => {
    if (this.type === "jalali") {
      return this.currentDate.clone().startOf("jMonth") as T;
    } else {
      return this.currentDate.clone().startOf("month") as T;
    }
  };

  getEndOfMonth<T extends Moment>(): T {
    if (this.type === "jalali") {
      return this.currentDate.clone().endOf("jMonth") as T;
    } else {
      return this.currentDate.clone().endOf("month") as T;
    }
  }

  getStartOfCalendar<T extends Moment>(): T {
    return this.getStartOfMonth<T>().clone().startOf("week") as T;
  }

  getEndOfCalendar<T extends Moment>(): T {
    return this.getEndOfMonth<T>().clone().endOf("week") as T;
  }

  // Updated getCalendar method to include `inCurrentMonth` flag
  getCalendar<T extends Moment>(): {
    date: T;
    inCurrentMonth: boolean;
    isCurrentDate: boolean;
  }[][] {
    let date = this.getStartOfCalendar<T>().clone().subtract(1, "day");
    const calendar: {
      date: T;
      inCurrentMonth: boolean;
      isCurrentDate: boolean;
    }[][] = [];

    const startOfMonth = this.getStartOfMonth<T>();
    const endOfMonth = this.getEndOfMonth<T>();

    while (date.isBefore(this.getEndOfCalendar<T>(), "day")) {
      const week: {
        date: T;
        inCurrentMonth: boolean;
        isCurrentDate: boolean;
      }[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = date.add(1, "day").clone() as T;
        week.push({
          date: currentDate,
          inCurrentMonth: currentDate.isBetween(
            startOfMonth,
            endOfMonth,
            undefined,
            "[]"
          ),
          isCurrentDate: currentDate.isSame(this.currentDate, "day"),
        });
      }
      calendar.push(week);
    }
    return calendar;
  }

  nextMonth(): void {
    this.currentDate =
      this.type === "jalali"
        ? this.currentDate.clone().add(1, "jMonth")
        : this.currentDate.clone().add(1, "month");
  }

  prevMonth(): void {
    this.currentDate =
      this.type === "jalali"
        ? this.currentDate.clone().subtract(1, "jMonth")
        : this.currentDate.clone().subtract(1, "month");
  }

  nextYear(): void {
    this.currentDate =
      this.type === "jalali"
        ? this.currentDate.clone().add(1, "jYear")
        : this.currentDate.clone().add(1, "year");
  }

  prevYear(): void {
    this.currentDate =
      this.type === "jalali"
        ? this.currentDate.clone().subtract(1, "jYear")
        : this.currentDate.clone().subtract(1, "year");
  }

  format<T extends Moment>(date: T, formatString: string): string {
    return this.type === "jalali"
      ? date.format(`j${formatString}`)
      : date.format(formatString);
  }
}

export default Calender;
