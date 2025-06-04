// Import useState from React to manage component state
import { useState } from "react";
import type { Company } from "../types/company";

// A custom React hook to manage a drag-and-drop shortlist of companies
export const useCompanyShortlist = (initial: Company[]) => {
  // Initialize state for companies available to be shortlisted
  const [available, setAvailable] = useState<Company[]>(initial);

  // Initialize state for the current shortlist of selected companies
  const [shortlist, setShortlist] = useState<Company[]>([]);

  // State to keep track of which company is currently being dragged
  const [dragged, setDragged] = useState<Company | null>(null);

  // Optional error message state for debugging or user feedback
  const [error, setError] = useState<string | null>(null);

  // Function called when a drag operation starts
  const handleDragStart = (item: Company) => {
    try {
      // Save the dragged item in state
      setDragged(item);
    } catch (err) {
      // Log and save any error that occurs
      console.error("Error starting drag:", err);
      setError("An error occurred while dragging.");
    }
  };

  // Function called when a dragged item is dropped onto the shortlist area
  const handleDrop = () => {
    try {
      // Proceed only if an item is being dragged and isn't already in the shortlist
      if (dragged && !shortlist.find((c) => c.id === dragged.id)) {
        // Add dragged item to shortlist
        setShortlist((prev) => [...prev, dragged]);

        // Remove dragged item from available list
        setAvailable((prev) => prev.filter((c) => c.id !== dragged.id));
      }
    } catch (err) {
      console.error("Error during drop:", err);
      setError("An error occurred while dropping the item.");
    } finally {
      // Clear the dragged item state regardless of outcome
      setDragged(null);
    }
  };

  // Function to remove an item from the shortlist and return it to the available list
  const handleRemove = (id: number) => {
    try {
      // Find the item to be removed
      const removed = shortlist.find((c) => c.id === id);

      // If found, remove from shortlist and return to available list
      if (removed) {
        setShortlist((prev) => prev.filter((c) => c.id !== id));
        setAvailable((prev) => [...prev, removed]);
      }
    } catch (err) {
      console.error("Error removing item from shortlist:", err);
      setError("An error occurred while removing the item.");
    }
  };

  // Function to reorder items within the shortlist drag and drop sorting
  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      // Create a shallow copy of the shortlist array
      const updated = [...shortlist];

      // Remove the item from the drag index
      const [moved] = updated.splice(dragIndex, 1);

      // Insert the item into the hover index
      updated.splice(hoverIndex, 0, moved);

      // Update the shortlist state
      setShortlist(updated);
    } catch (err) {
      console.error("Error during sorting:", err);
      setError("An error occurred while sorting the list.");
    }
  };

  // Function to simulate submitting the final ranked shortlist
  const handleSubmit = () => {
    try {
      // Convert the shortlist to a simple name and ranking format
      const rankingArray = shortlist.map((item, index) => [item.name, index + 1]);

      // Output to console as placeholder for actual API call
      console.log("Ranking array:", rankingArray);

      // Simulate success alert to the user
      alert("Submitted! Check console for result.");
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An error occurred while submitting the rankings.");
    }
  };

  // Return all useful state and functions from the hook so they can be used externally
  return {
    available,        // Residencies not yet shortlisted
    shortlist,        // Residencies currently in shortlist
    dragged,          // Currently dragged item
    setDragged,       // Setter in case the parent needs to manually change dragged item
    handleDragStart,  // Drag start handler
    handleDrop,       // Drop handler
    handleRemove,     // Remove item from shortlist
    handleSort,       // Sort items in shortlist
    handleSubmit,     // Submit final shortlist
    error,            // Any error message to be displayed or logged
  };
};
