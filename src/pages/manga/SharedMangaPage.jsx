import React, { useState, useEffect } from "react";
import { useShareHelpers } from "../../helpers/useShareHelpers";
import "./BookshelfPage.css"

const SharedMangaPage = (props, auth) => {
    const { isLoading, fetchedManga } = useShareHelpers(props.username);
    const [availableManga, setAvailableManga] = useState([]);

    useEffect(() => {
        setAvailableManga(fetchedManga);
    }, [fetchedManga]);

    const handleRemove = async (url) => {

        try {
            await fetch(`/share/${props.username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
        } catch (error) {
            console.error("Error deleting manga");
        } finally {
            setAvailableManga(prev => prev.filter(item => item.url !== url))
        }
    }

    const addMangaElements = availableManga.map((manga) => {
        if (props.mangaList.some(item => item.id === manga.id)) {
        }
        return (
            <div key={manga.series+manga.vol} className="ImageGallery-photo-container-add">
                <img src={manga.url} alt={manga.series}/>
                <button onClick={() => handleRemove(manga.url)} className="remove-button">Remove</button>
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

export default SharedMangaPage;
