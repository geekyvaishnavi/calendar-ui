import { useState, useEffect } from "react";

export default function useNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("calendar_notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("calendar_notes", JSON.stringify(notes));
  }, [notes]);

  return {
    notes,
    setNotes,
    selectedNoteId,
    setSelectedNoteId,
  };
}