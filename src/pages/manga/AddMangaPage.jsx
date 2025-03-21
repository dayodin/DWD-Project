import React, { useState, useEffect } from "react";
import { useAddMangaFetching } from "../../helpers/useAddMangaFetching";
import "./BookshelfPage.css"

const AddMangaPage = (props) => {
    const { isLoading, fetchedManga } = useAddMangaFetching("", props.authToken);
    const [availableManga, setAvailableManga] = useState([]);

    useEffect(() => {
        setAvailableManga(fetchedManga);
    }, [fetchedManga]);

    const handleAdd = async (manga) => {

        try {
            const response = await fetch("/api/manga", {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${props.authToken}`
                    },
                    body: JSON.stringify(manga),
                },
            );
        } catch (error) {
            console.error("Error fetching images:", error);
        }
        props.addManga(manga);
        setAvailableManga(prev => prev.filter(item => item._id !== manga._id));
    };

    const addMangaElements = availableManga.map((manga) => {
        if (props.mangaList.some(item => item.id === manga.id)) {
        }
        return (
            <div key={manga._id} className="ImageGallery-photo-container-add">
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
