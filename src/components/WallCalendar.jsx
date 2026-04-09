import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github } from "lucide-react";
import { isBefore } from "date-fns";

import SpiralBinding from "./SpiralBinding";
import HeroSection from "./HeroSection";
import NotesSection from "./NotesSection";
import CalendarGrid from "./CalendarGrid";

import useCalendar from "../hooks/useCalendar";
import useNotes from "../hooks/useNotes";
import { heroImages, themeColors } from "../constants/calendar";
import { startOfDay } from "date-fns";

export default function WallCalendar() {
  const {
    currentDate,
    calendarDays,
    monthStart,
    direction,
    nextMonth,
    prevMonth,
    goToToday,
  } = useCalendar();

  const { notes, setNotes, selectedNoteId, setSelectedNoteId } = useNotes();

  const today = startOfDay(new Date());

  const [range, setRange] = useState({
    start: today,
    end: today,
  });
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const themeColor = themeColors[currentDate.getMonth()];

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);
      document.body.style.userSelect = "auto";

      if (hoveredDate && range.start && !range.end) {
        if (isBefore(hoveredDate, range.start)) {
          setRange({ start: hoveredDate, end: range.start });
        } else {
          setRange({ ...range, end: hoveredDate });
        }
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, hoveredDate, range.start, range.end]);

  const handleDateClick = (day) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
      setSelectedNoteId(null);
    } else {
      if (isBefore(day, range.start)) {
        setRange({ start: day, end: range.start });
      } else {
        setRange({ ...range, end: day });
      }
    }
  };

  const handleDragStart = (day) => {
    document.body.style.userSelect = "none";

    setRange({ start: day, end: null });
    setHoveredDate(day);
    setIsDragging(true);
    setSelectedNoteId(null);
  };

  const handleDragEnter = (day) => {
    if (isDragging) {
      setHoveredDate(day);
    }
  };

  return (
    <div
      className="
        h-screen w-full flex items-center justify-center
        bg-gradient-to-br from-slate-100 to-slate-200
        relative overflow-hidden transition-colors duration-300
      "
    >
      {/* Vignette */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]
        "
      />

      {/* Top Right Controls */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2">
        <button
          onClick={() =>
            window.open(
              "https://github.com/geekyvaishnavi/calendar-ui",
              "_blank",
            )
          }
          className="
            p-2.5 sm:p-3
            bg-white/80 backdrop-blur
            shadow-md hover:shadow-lg
            rounded-full
            text-slate-600
            hover:scale-110 transition-all
            border border-slate-200/70
            hover:bg-black hover:text-white
          "
        >
          <Github size={18} />
        </button>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="
          relative aspect-[3/4] w-[min(92vw,560px)]
          flex flex-col
          bg-gradient-to-b from-white to-slate-50
          backdrop-blur-xl
          border border-slate-200/60
          ring-1 ring-black/5
          shadow-[0_10px_30px_rgba(0,0,0,0.08),0_30px_60px_rgba(0,0,0,0.12)]
          paper-texture
          rounded-b-lg sm:rounded-none
          transition-colors duration-300
        "
      >
        <SpiralBinding />

        <HeroSection
          currentDate={currentDate}
          direction={direction}
          onPrev={prevMonth}
          onNext={nextMonth}
          onToday={goToToday}
          heroImages={heroImages}
          themeColor={themeColor}
        />

        {/* Bottom Section */}
        <div className="relative flex-1 flex flex-col">
          {/* Notch */}
          <div className="absolute -top-[20px] sm:-top-[60px] left-0 right-0 h-[20px] sm:h-[60px] z-20">
            <svg
              viewBox="0 0 800 60"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 L350,0 L520,60 L800,0 L800,60 L0,60 Z"
                className="fill-white drop-shadow-[0_-4px_6px_rgba(0,0,0,0.08)]"
              />
            </svg>
          </div>

          {/* Content */}
          <div
            className="
              flex flex-col md:flex-row
              p-2 sm:p-2.5 md:p-3
              gap-2 sm:gap-3 md:gap-4
              flex-1
            "
          >
            <NotesSection
              notes={notes}
              setNotes={setNotes}
              range={range}
              setRange={setRange}
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              themeColor={themeColor}
            />

            <CalendarGrid
              calendarDays={calendarDays}
              monthStart={monthStart}
              range={range}
              hoveredDate={hoveredDate}
              setHoveredDate={setHoveredDate}
              onDateClick={handleDateClick}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              isDragging={isDragging}
              themeColor={themeColor}
              notes={notes}
              selectedNoteId={selectedNoteId}
            />
          </div>

          {/* Bottom spacing */}
          <div className="h-2 sm:h-3 bg-white" />
        </div>
      </motion.div>
    </div>
  );
}
