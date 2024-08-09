import moment from "moment-jalaali";
import type { FC } from "react";
import type { AppProps } from "./App.types";
import { ThemeContextProvider } from "./context/theme";
import { useCalendar } from "./hooks/useCalendar";

const App: FC<AppProps> = ({}) => {
  const {
    currentDate,
    selectedDates,
    hoveredDate,
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
    getCalendar,
    getListOfMonths,
    getListOfYears,
    selectDate,
    onHoverDate,
    isSelectedDate,
    isInHoverRange,
    getListOfWeek,
  } = useCalendar({
    initialType: "jalali",
    initialYearRange: 103,
  });

  const week = getListOfWeek();
  const months = getListOfMonths();
  const years = getListOfYears();

  const calendarMatrix = getCalendar();
  return (
    <ThemeContextProvider>
      <div>
        <h1>{moment(currentDate).format("jMMMM jYYYY")}</h1>
        <button onClick={prevYear}>Previous Year</button>
        <button onClick={prevMonth}>Previous Month</button>
        <button onClick={nextMonth}>Next Month</button>
        <button onClick={nextYear}>Next Year</button>

        <div>
          <h3>Months</h3>
          <ul>
            {months.map((month, index) => (
              <li key={index}>{month}</li>
            ))}
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              {week.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarMatrix.map((week, index) => (
              <tr key={index}>
                {week.map(({ date, inCurrentMonth, isCurrentDate }, idx) => (
                  <td
                    key={idx}
                    onClick={() =>
                      selectDate({ date, inCurrentMonth, isCurrentDate })
                    }
                    onMouseEnter={() => onHoverDate(date)}
                    onMouseLeave={() => onHoverDate(null)}
                    style={{
                      color: inCurrentMonth ? "black" : "gray",
                      fontWeight: isCurrentDate ? "bold" : "normal",
                      backgroundColor: isInHoverRange(date)
                        ? "lightblue"
                        : isSelectedDate(date)
                        ? "yellow"
                        : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s ease-out",
                    }}
                  >
                    {date.format("jD")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h3>Selected Dates</h3>
          <ul>
            {selectedDates.map((date, index) => (
              <li key={index}>{date.format("jD jMMMM jYYYY")}</li>
            ))}
          </ul>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default App;
