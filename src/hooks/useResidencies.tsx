import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const useResidencies = () => {
  const [loading, setLoading] = useState(true);
  const [residencies, setResidencies] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        const res = await fetch("http://localhost:8000/get-residencies", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch residencies: ${res.statusText}`);
        }

        const data = await res.json();

        const transformed = data.map((item: any) => ({
          id: item.id,
          title: item.description,
          salary: item.salary,
          company_name: item.company_name,
        }));

        setResidencies(transformed);
      } catch (err) {
        console.error("Error fetching residencies:", err);
        setError("An error occurred while loading residencies.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidencies();
  }, []);

  return { residencies, loading, error };
};
