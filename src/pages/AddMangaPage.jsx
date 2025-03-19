import React, { useState, useEffect } from "react";
import { useAddMangaFetching } from "../helpers/useAddMangaFetching";
import "./BookshelfPage.css"

const AddMangaPage = (props) => {
    const { isLoading, fetchedManga } = useAddMangaFetching("");
    const [availableManga, setAvailableManga] = useState([]);

    // API call would also go here
    useEffect(() => {
        setAvailableManga(fetchedManga);
    }, [fetchedManga]);

    const handleAdd = (manga) => {
        props.addManga(manga);
        setAvailableManga(prev => prev.filter(item => item.id !== manga.id));
    };

    const addMangaElements = availableManga.map((manga) => {
        if (props.mangaList.some(item => item.id === manga.id)) {
        }
        return (
            <div key={manga.id} className="ImageGallery-photo-container-add">
                <img src={manga.url} alt={manga.series}/>
                <button onClick={() => handleAdd(manga)} className="Add-button">Add Manga</button>
            </div>
        )
    });

    return (
        <>
            {isLoading && "Loading..."}
            <div className="ImageGallery">
                {addMangaElements}
            </div>
        </>
    );
}

export default AddMangaPage;
