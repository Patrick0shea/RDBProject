import { useState } from "react";
import type { Company } from "../types/company";

export const useCompanyShortlist = (initial: Company[]) => {
  const [available, setAvailable] = useState<Company[]>(initial);
  const [shortlist, setShortlist] = useState<Company[]>([]);
  const [dragged, setDragged] = useState<Company | null>(null);

  const handleDragStart = (item: Company) => setDragged(item);

  const handleDrop = () => {
    if (dragged && !shortlist.find((c) => c.id === dragged.id)) {
      setShortlist((prev) => [...prev, dragged]);
      setAvailable((prev) => prev.filter((c) => c.id !== dragged.id));
    }
    setDragged(null);
  };

  const handleRemove = (id: number) => {
    const removed = shortlist.find((c) => c.id === id.toString());
    if (removed) {
      setShortlist((prev) => prev.filter((c) => c.id !== id.toString()));
      setAvailable((prev) => [...prev, removed]);
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    const updated = [...shortlist];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, moved);
    setShortlist(updated);
  };

  const handleSubmit = () => {
    const rankingArray = shortlist.map((item, index) => [item.name, index + 1]);
    console.log("Ranking array:", rankingArray);
    alert("Submitted! Check console for result.");
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
  };
};
