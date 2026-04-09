import { useState, useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isBefore,
} from "date-fns";

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  const nextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setDirection(isBefore(today, currentDate) ? -1 : 1);
    setCurrentDate(today);
  };

  return {
    currentDate,
    calendarDays,
    monthStart,
    direction,
    nextMonth,
    prevMonth,
    goToToday,
  };
}