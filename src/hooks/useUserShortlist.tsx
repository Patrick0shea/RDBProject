import { useState } from "react";
import type { User } from "../types/user";

export const useUserShortlist = () => {
  const [available, setAvailable] = useState<User[]>([]);
  const [shortlist, setShortlist] = useState<User[]>([]);
  const [dragged, setDragged] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // New error state

  const handleDragStart = (item: User) => setDragged(item);

  const handleDrop = () => {
    try {
      if (dragged && !shortlist.find((c) => c.id === dragged.id)) {
        setShortlist((prev) => [...prev, dragged]);
        setAvailable((prev) => prev.filter((c) => c.id !== dragged.id));
      }
    } catch (err) {
      console.error("Error during drop:", err);
      setError("An error occurred while moving an item to the shortlist.");
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
      console.error("Error during remove:", err);
      setError("An error occurred while removing an item from the shortlist.");
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      const updated = [...shortlist];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      setShortlist(updated);
    } catch (err) {
      console.error("Error during sort:", err);
      setError("An error occurred while sorting the shortlist.");
    }
  };

  const handleSubmit = async () => {
    const rankingPayload = shortlist.map((item, index) => ({
      residency_id: item.id,
      position: index + 1,
    }));

    try {
      const response = await fetch("http://localhost:8000/submit-rankings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rankingPayload),
      });

      if (!response.ok) throw new Error(`Failed to submit: ${response.statusText}`);

      const data = await response.json();
      console.log("Server response:", data);
      alert("Rankings submitted!");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit rankings. Please try again.");
      alert("Submission failed.");
    }
  };

  return {
    available,
    setAvailable,
    shortlist,
    dragged,
    setDragged,
    handleDragStart,
    handleDrop,
    handleRemove,
    handleSort,
    handleSubmit,
    error, // Exposed error for UI feedback
  };
};
