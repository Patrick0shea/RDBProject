import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const useResidencies = () => {
  const [loading, setLoading] = useState(true);
  const [residencies, setResidencies] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/get-residencies", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch residencies");
        return res.json();
      })
      .then((data) => {
        const transformed = data.map((item: any) => ({
          id: item.id,
          title: item.description,
          salary: item.salary,
          company_name: item.company_name,
        }));
        setResidencies(transformed);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { residencies, loading };
};
