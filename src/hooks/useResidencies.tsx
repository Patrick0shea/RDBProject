// Importing hooks from React
import { useEffect, useState } from "react";
import type { User } from "../types/user";

// A custom hook for fetching residency data from the backend
export const useResidencies = () => {
  // Local state for loading status
  const [loading, setLoading] = useState(true);

  // State to store the list of residencies (typed as User[])
  const [residencies, setResidencies] = useState<User[]>([]);

  // State for capturing error messages, if any occur during fetching
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once on component mount to trigger the data fetch
  useEffect(() => {
    // Define an async function to handle the fetch logic
    const fetchResidencies = async () => {
      try {
        // Perform a GET request to the backend API, including cookies (credentials)
        const res = await fetch("http://localhost:8000/get-residencies", {
          credentials: "include",
        });

        // Check if the response was not successful
        if (!res.ok) {
          throw new Error(`Failed to fetch residencies: ${res.statusText}`);
        }

        // Parse the response as JSON as the data is a raw array of objects
        const data = await res.json();

        // Transform the raw data to match the expected User shape
        const transformed = data.map((item: any) => ({
          id: item.id,
          title: item.description,         // Mapping description to title
          salary: item.salary,
          company_name: item.company_name, // Explicit remapping for clarity
        }));

        // Save the transformed data in state
        setResidencies(transformed);
      } catch (err) {
        // Log the error and update error state with user-friendly message
        console.error("Error fetching residencies:", err);
        setError("An error occurred while loading residencies.");
      } finally {
        // Regardless of success or failure, stop showing loading indicator
        setLoading(false);
      }
    };

    // Call the async fetch function immediately on mount
    fetchResidencies();
  }, []); // Empty dependency array ensures this runs only once

  // Return the state values so components using the hook can access them
  return { residencies, loading, error };
};
