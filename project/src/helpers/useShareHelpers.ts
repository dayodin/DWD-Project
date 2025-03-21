import { useEffect, useState } from "react";

export function useShareHelpers(username: string, delay = 1000) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedManga, setFetchedManga] = useState<any[]>([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(`/share/${username}`);
        const data = await response.json();
        setFetchedManga(data);
      } catch (error) {
        console.error("Error fetching shared manga:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManga();
  }, [username]);

  return { isLoading, fetchedManga };
}
