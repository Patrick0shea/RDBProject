// Import useState to manage local component state
import { useState } from "react";
import type { User } from "../types/user";

// This hook manages a shortlist of users with drag and drop, sorting, removal, and API submission.
export const useUserShortlist = () => {
  // List of users available to shortlist
  const [available, setAvailable] = useState<User[]>([]);

  // List of users currently shortlisted - ordered
  const [shortlist, setShortlist] = useState<User[]>([]);

  // Currently dragged user during drag and drop operations
  const [dragged, setDragged] = useState<User | null>(null);

  // Error message for displaying issues in UI or logs
  const [error, setError] = useState<string | null>(null);

  // Called when a drag operation begins — stores the dragged user
  const handleDragStart = (item: User) => setDragged(item);

  // Called when a dragged user is dropped into the shortlist area
  const handleDrop = () => {
    try {
      // Only add if the user isn't already shortlisted
      if (dragged && !shortlist.find((c) => c.id === dragged.id)) {
        // Add dragged user to the shortlist
        setShortlist((prev) => [...prev, dragged]);

        // Remove them from the available list
        setAvailable((prev) => prev.filter((c) => c.id !== dragged.id));
      }
    } catch (err) {
      console.error("Error during drop:", err);
      setError("An error occurred while moving an item to the shortlist.");
    } finally {
      // Reset dragged user state regardless of success/failure
      setDragged(null);
    }
  };

  // Removes a user from the shortlist and puts them back into the available list
  const handleRemove = (id: number) => {
    try {
      const removed = shortlist.find((c) => c.id === id);
      if (removed) {
        // Remove from shortlist
        setShortlist((prev) => prev.filter((c) => c.id !== id));

        // Return to available list
        setAvailable((prev) => [...prev, removed]);
      }
    } catch (err) {
      console.error("Error during remove:", err);
      setError("An error occurred while removing an item from the shortlist.");
    }
  };

  // Reorders the shortlist using drag and drop indices
  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      const updated = [...shortlist];

      // Remove item from drag index and insert at hover index
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);

      setShortlist(updated);
    } catch (err) {
      console.error("Error during sort:", err);
      setError("An error occurred while sorting the shortlist.");
    }
  };

  // Submits the current shortlist rankings to the server via POST
  const handleSubmit = async () => {
    // Create the payload: each user and their ranking (starting from 1)
    const rankingPayload = shortlist.map((item, index) => ({
      residency_id: item.id,
      position: index + 1,
    }));

    try {
      const response = await fetch("http://localhost:8000/submit-rankings", {
        method: "POST",
        credentials: "include", // Important for authenticated requests
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rankingPayload),
      });

      // Throw if the request failed
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

  // Expose all necessary state and handlers for use in consuming components
  return {
    available,          // Users not yet shortlisted
    setAvailable,       // Allow setting available users (e.g., after fetch)
    shortlist,          // Current ordered shortlist
    dragged,            // Currently dragged user
    setDragged,         // For manual control if needed
    handleDragStart,    // Drag event handler
    handleDrop,         // Drop event handler
    handleRemove,       // Remove user from shortlist
    handleSort,         // Sort users within the shortlist
    handleSubmit,       // Submit the final list
    error,              // Error message for UI display
  };
};
