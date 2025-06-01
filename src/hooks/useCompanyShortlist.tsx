import { useState } from "react";
import type { Company } from "../types/company";

export const useCompanyShortlist = (initial: Company[]) => {
  const [available, setAvailable] = useState<Company[]>(initial);
  const [shortlist, setShortlist] = useState<Company[]>([]);
  const [dragged, setDragged] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragStart = (item: Company) => {
    try {
      setDragged(item);
    } catch (err) {
      console.error("Error starting drag:", err);
      setError("An error occurred while dragging.");
    }
  };

  const handleDrop = () => {
    try {
      if (dragged && !shortlist.find((c) => c.id === dragged.id)) {
        setShortlist((prev) => [...prev, dragged]);
        setAvailable((prev) => prev.filter((c) => c.id !== dragged.id));
      }
    } catch (err) {
      console.error("Error during drop:", err);
      setError("An error occurred while dropping the item.");
    } finally {
      setDragged(null);
    }
  };

  const handleRemove = (id: number) => {
  try {
    const removed = shortlist.find((c) => c.id === id);
    if (removed) {
      setShortlist((prev) => prev.filter((c) => c.id !== id));
      setAvailable((prev) => [...prev, removed]);
    }
  } catch (err) {
    console.error("Error removing item from shortlist:", err);
    setError("An error occurred while removing the item.");
  }
};

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      const updated = [...shortlist];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      setShortlist(updated);
    } catch (err) {
      console.error("Error during sorting:", err);
      setError("An error occurred while sorting the list.");
    }
  };

  const handleSubmit = () => {
    try {
      const rankingArray = shortlist.map((item, index) => [item.name, index + 1]);
      console.log("Ranking array:", rankingArray);
      alert("Submitted! Check console for result.");
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An error occurred while submitting the rankings.");
    }
  };

  return {
    available,
    shortlist,
    dragged,
    setDragged,
    handleDragStart,
    handleDrop,
    handleRemove,
    handleSort,
    handleSubmit,
    error, // optionally consume this in your component
  };
};
