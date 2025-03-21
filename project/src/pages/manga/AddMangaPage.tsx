import * as React from 'react';
import { useState, useEffect } from "react";
import { useAddMangaFetching } from "../../helpers/useAddMangaFetching";
import "./BookshelfPage.css";
import { Manga } from "../../App";

interface AddMangaPageProps {
  addManga: (manga: Manga) => void;
  mangaList: Manga[];
  authToken: string | null;
}

const AddMangaPage: React.FC<AddMangaPageProps> = (props) => {
  const { isLoading, fetchedManga } = useAddMangaFetching("", props.authToken || "");
  const [availableManga, setAvailableManga] = useState<Manga[]>([]);

  useEffect(() => {
    setAvailableManga(fetchedManga);
  }, [fetchedManga]);

  const handleAdd = async (manga: Manga) => {
    try {
      await fetch("/api/manga", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.authToken}`
        },
        body: JSON.stringify(manga),
      });
    } catch (error) {
      console.error("Error adding manga:", error);
    }
    props.addManga(manga);
    setAvailableManga((prev) => prev.filter((item) => item._id !== manga._id));
  };

  const addMangaElements = availableManga.map((manga) => {
    if (typeof manga._id === 'string' && manga._id.length > 10) {
      return null;
    }

    return (
      <div key={manga._id} className="ImageGallery-photo-container-add">
        <img src={manga.url} alt={manga.series} />
        <button onClick={() => handleAdd(manga)} className="Add-button">
          Add Manga
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

export default AddMangaPage;
