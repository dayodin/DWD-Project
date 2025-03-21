import * as React from 'react';
import { useState, useEffect } from "react";
import { useShareHelpers } from "../../helpers/useShareHelpers";
import "./BookshelfPage.css";
import { Manga } from "../../App";

interface SharedMangaPageProps {
  username: string | null;
  mangaList: Manga[];
  addManga: (manga: Manga) => void;
}

const SharedMangaPage: React.FC<SharedMangaPageProps> = (props) => {
  const { isLoading, fetchedManga } = useShareHelpers(props.username || "");
  const [availableManga, setAvailableManga] = useState<any[]>([]);

  useEffect(() => {
    setAvailableManga(fetchedManga);
  }, [fetchedManga]);

  const handleRemove = async (url: string) => {
    try {
      await fetch(`/share/${props.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
    } catch (error) {
      console.error("Error deleting manga", error);
    } finally {
      setAvailableManga((prev) => prev.filter((item) => item.url !== url));
    }
  };

  const addMangaElements = availableManga.map((manga) => {

    return (
      <div key={manga.series + manga.vol} className="ImageGallery-photo-container-add">
        <img src={manga.url} alt={manga.series} />
        <button onClick={() => handleRemove(manga.url)} className="remove-button">
          Remove
        </button>
      </div>
    );
  });

  return (
    <>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{addMangaElements}</div>
    </>
  );
};

export default SharedMangaPage;