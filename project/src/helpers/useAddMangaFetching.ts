import { useEffect, useState } from "react";
import { Manga } from "../App";

export function useAddMangaFetching(mangaId: string, authToken: string, delay = 1000) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedManga, setFetchedManga] = useState<Manga[]>([]);

  useEffect(() => {
    const fetchAddManga = async () => {
      try {
        const response = await fetch("/api/addmanga", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setFetchedManga(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddManga();
  }, [mangaId, authToken]);

  return { isLoading, fetchedManga };
}
