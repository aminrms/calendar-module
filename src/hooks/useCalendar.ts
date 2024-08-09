import { useState, useCallback, useEffect } from "react";
import Calender from "../module/calender/index";
import type {
  CalenderType,
  EachCalenderDateType,
} from "../module/calender/Calender.types";
import moment, { type Moment } from "moment-jalaali";

export const useCalendar = ({
  initialType = "jalali",
  initialYearRange = 5,
}: {
  initialType: CalenderType;
  initialYearRange: number;
}) => {
  const [calendar] = useState(
    () => new Calender({ calenderType: initialType })
  );
  const [currentDate, setCurrentDate] = useState<Moment>(calendar.currentDate);
  const [selectedDates, setSelectedDates] = useState<Moment[]>([]);
  const [hoveredDate, setHoveredDate] = useState<Moment | null>(null);

  const setCalendarType = useCallback(
    (type: CalenderType) => {
      calendar.setCalenderType(type);
      setCurrentDate(calendar.currentDate);
    },
    [calendar]
  );

  const nextMonth = useCallback(() => {
    calendar.nextMonth();
    setCurrentDate(calendar.currentDate.clone());
  }, [calendar]);

  const prevMonth = useCallback(() => {
    calendar.prevMonth();
    setCurrentDate(calendar.currentDate.clone());
  }, [calendar]);

  const nextYear = useCallback(() => {
    calendar.nextYear();
    setCurrentDate(calendar.currentDate.clone());
  }, [calendar]);

  const prevYear = useCallback(() => {
    calendar.prevYear();
    setCurrentDate(calendar.currentDate.clone());
  }, [calendar]);

  const getCalendar = useCallback(() => {
    return calendar.getCalendar<Moment>();
  }, [calendar]);

  const format = useCallback(
    (date: Moment, formatString: string) => {
      return calendar.format(date, formatString);
    },
    [calendar]
  );
  const getListOfWeek = useCallback(() => {
    if (calendar.type === "jalali") {
      moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
      return moment.weekdays(true);
    } else {
      return moment.weekdays();
    }
  }, [calendar.type]);
  const getListOfMonths = useCallback(() => {
    const months: string[] = [];
    for (let i = 0; i < 12; i++) {
      months.push(
        calendar.type === "jalali"
          ? moment().jMonth(i).format("jMMMM")
          : moment().month(i).format("MMMM")
      );
    }
    return months;
  }, [calendar.type]);

  const getListOfYears = useCallback(() => {
    const years: string[] = [];
    const currentYear =
      calendar.type === "jalali" ? moment().jYear() : moment().year();

    for (
      let i = currentYear - initialYearRange;
      i <= currentYear + initialYearRange;
      i++
    ) {
      years.push(
        calendar.type === "jalali"
          ? moment().jYear(i).format("jYYYY")
          : moment().year(i).format("YYYY")
      );
    }
    return years;
  }, [calendar.type, initialYearRange]);

  const selectDate = useCallback(
    ({ date }: EachCalenderDateType<Moment>) => {
      let tempSelectedDates = [...selectedDates];
      if (tempSelectedDates.length >= 1) {
        const startDate = tempSelectedDates[0];
        if (date?.isSame(startDate, "day")) {
          tempSelectedDates = [];
        } else if (date?.isBefore(startDate, "day")) {
          tempSelectedDates = [date];
        } else {
          let dates: Moment[] = [];
          let currentDate = startDate.clone();
          while (currentDate.isBefore(date, "day")) {
            dates.push(currentDate.clone());
            currentDate.add(1, "day");
          }
          dates.push(date.clone());
          tempSelectedDates = dates;
        }
      } else {
        tempSelectedDates = [date];
      }
      setSelectedDates(tempSelectedDates);
    },
    [selectedDates]
  );
  const onHoverDate = useCallback((date: Moment | null) => {
    setHoveredDate(date);
  }, []);

  const isSelectedDate = useCallback(
    (date: Moment) => {
      return selectedDates.some((d) => d.isSame(date, "day"));
    },
    [selectedDates]
  );

  const isInHoverRange = useCallback(
    (date: Moment) => {
      if (!hoveredDate || selectedDates.length === 0) return false;
      const [startDate] = selectedDates;
      return date.isBetween(startDate, hoveredDate, "day", "[]");
    },
    [hoveredDate, selectedDates]
  );

  useEffect(() => {
    if (hoveredDate) {
      const updatedSelectedDates = selectedDates.map((d) => {
        if (d.isSame(hoveredDate, "day")) {
          return hoveredDate;
        }
        return d;
      });
      setSelectedDates(updatedSelectedDates);
    }
  }, [hoveredDate]);

  return {
    currentDate,
    selectedDates,
    hoveredDate,
    setCalendarType,
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
    getCalendar,
    format,
    getListOfMonths,
    getListOfWeek,
    getListOfYears,
    selectDate,
    onHoverDate,
    isSelectedDate,
    isInHoverRange,
  };
};
