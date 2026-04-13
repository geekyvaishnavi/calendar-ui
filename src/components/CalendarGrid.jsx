import React from 'react';
import { isSameMonth, isSameDay, isBefore, parseISO } from 'date-fns';
import { motion } from 'motion/react';

const CalendarGrid = ({
  calendarDays,
  monthStart,
  range,
  hoveredDate,
  onDateClick,
  onDragStart,
  onDragEnter,
  isDragging,
  themeColor,
  notes,
}) => {

  const isInRange = (day) => {
    if (!range.start) return false;

    const start =
      range.end
        ? range.start
        : hoveredDate && isBefore(hoveredDate, range.start)
        ? hoveredDate
        : range.start;

    const end =
      range.end
        ? range.end
        : hoveredDate && isBefore(hoveredDate, range.start)
        ? range.start
        : hoveredDate;

    if (!start || !end) return false;

    return day >= start && day <= end;
  };
  const hasNoteForDay = (day) => {
    return notes.some((n) => {
      if (!n.date || !n.content?.trim()) return false;
      return isSameDay(parseISO(n.date), day);
    });
  };

  return (
    <div className="flex-[0.6] sm:flex-1 select-none px-2 sm:px-2 md:px-3">

      {/* Week Header */}
      <div className="grid grid-cols-7 mb-2">
        {['MON','TUE','WED','THU','FRI','SAT','SUN'].map((d, i) => (
          <div
            key={d}
            className="text-center text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500"
            style={{ color: i >= 5 ? themeColor : undefined }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={monthStart.toString()}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="grid grid-cols-7 gap-[3px]"
      >
        {calendarDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          const isStart = range.start && isSameDay(day, range.start);
          const isEnd =
            (range.end && isSameDay(day, range.end)) ||
            (!range.end && hoveredDate && isSameDay(day, hoveredDate));

          const inRange = isInRange(day);
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;

          return (
            <div
              key={day.toString()}
              className="relative"
              onMouseDown={() => onDragStart(day)}
              onMouseEnter={() => onDragEnter(day)}
            >

              {/* Range BG */}
              {inRange && (
                <div
                  className={`
                    absolute inset-y-[6px] inset-x-0 z-0
                    transition-all duration-200 ease-out
                    ${isStart ? 'rounded-l-md ml-1' : ''}
                    ${isEnd ? 'rounded-r-md mr-1' : ''}
                  `}
                  style={{
                    backgroundColor: `${themeColor}${range.end ? "25" : "15"}`
                  }}
                />
              )}

              {/* Day Button */}
              <button
                onClick={() => !isDragging && onDateClick(day)}
                className={`
                  w-full max-w-[40px] aspect-square mx-auto
                  flex items-center justify-center
                  text-[14px]
                  rounded-full
                  relative z-10

                  transition-all duration-150 ease-out
                  ${isDragging ? "cursor-grabbing" : "cursor-pointer"}

                  ${!isCurrentMonth ? 'text-slate-300' : 'text-slate-700'}
                  ${isStart || isEnd ? 'text-white font-semibold' : ''}

                  hover:bg-slate-100/80
                  hover:scale-[1.04]
                  active:scale-[0.97]
                  hover:ring-1 hover:ring-slate-300/60
                `}
                style={{
                  color:
                    isCurrentMonth && isWeekend && !isStart && !isEnd
                      ? themeColor
                      : undefined,
                }}
              >
                {day.getDate()}

                {/* Today Indicator */}
                {isToday && (
                  <div
                    className="absolute inset-[4px] rounded-md border-2 pointer-events-none"
                    style={{ borderColor: themeColor }}
                  />
                )}

                {/* Dot */}
                {hasNoteForDay(day) && (
                  <div
                    className="absolute bottom-[4px] w-[5px] h-[5px] rounded-full opacity-80"
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </button>

              {/* Selection */}
              {(isStart || isEnd) && (
                <div
                  className="absolute inset-[3px] rounded-full z-0"
                  style={{
                    backgroundColor: themeColor,
                    boxShadow: `0 6px 12px ${themeColor}40, inset 0 1px 0 rgba(255,255,255,0.4)`
                  }}
                />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CalendarGrid;