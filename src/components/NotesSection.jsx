import React, { useRef, useState, useEffect } from "react";
import {
  parseISO,
  startOfDay,
  isSameDay,
  format,
  eachDayOfInterval,
} from "date-fns";

const normalizeDate = (date) => format(date, "yyyy-MM-dd");

const NotesSection = ({ notes, setNotes, range, themeColor, isDarkMode }) => {
  const textareaRef = useRef(null);
  const debounceRef = useRef(null);
  const activeNoteRef = useRef(null);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (!range?.start) {
      setContent("");
      activeNoteRef.current = null;
      return;
    }

    const currentDay = startOfDay(range.start);

    const notesForDay = notes.filter(
      (n) => n.date && isSameDay(parseISO(n.date), currentDay),
    );

    const isSingleDay = !range.end || isSameDay(range.start, range.end);

    if (notesForDay.length && isSingleDay) {
      const latest = notesForDay[notesForDay.length - 1];
      setContent(latest.content);
      activeNoteRef.current = latest;
    } else {
      setContent("");
      activeNoteRef.current = null;
    }

    textareaRef.current?.focus();
  }, [range?.start, range?.end]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = (value) => {
    const active = activeNoteRef.current;

    const isSingleDay = !range.end || isSameDay(range.start, range.end);

    if (active && isSingleDay) {
      setNotes((prev) =>
        value.trim()
          ? prev.map((n) => (n.id === active.id ? { ...n, content: value } : n))
          : prev.filter((n) => n.id !== active.id),
      );
      return;
    }

    if (!value.trim() || !range?.start) return;

    const days = eachDayOfInterval({
      start: range.start,
      end: range.end || range.start,
    });

    setNotes((prev) => [
      ...prev,
      ...days.map((day) => ({
        id: Date.now() + Math.random(),
        date: normalizeDate(day),
        content: value,
      })),
    ]);
  };

  return (
    <div className="w-full lg:w-[240px] flex flex-col px-3">
      <h2
        className="text-[13px] font-semibold tracking-[0.12em] uppercase mb-2"
        style={{ color: themeColor }}
      >
        Notes
      </h2>

      {range?.start && (
        <p className="text-[11px] text-slate-500 font-medium mb-2">
          {format(range.start, "MMM dd")}
          {range.end && ` — ${format(range.end, "MMM dd")}`}
        </p>
      )}

      <div
        onClick={() => textareaRef.current?.focus()}
        className="
          relative flex-1 min-h-[200px] cursor-text
          bg-white/70 backdrop-blur-sm
          rounded-lg
          transition-all duration-200
        "
      >
        {/* lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDarkMode
              ? "linear-gradient(#1f2937 1px, transparent 1px)"
              : "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "100% 26px",
          }}
        />

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            const value = e.target.value;
            setContent(value);

            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
              handleSave(value);
            }, 300);
          }}
          placeholder="Type…"
          className="
            w-full h-full bg-transparent border-none outline-none resize-none
            text-[14px] leading-[26px]
            px-2 py-1
            text-slate-700
            placeholder:text-slate-400
          "
          style={{ caretColor: themeColor }}
        />
      </div>
    </div>
  );
};

export default NotesSection;
