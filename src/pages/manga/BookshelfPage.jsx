import React, { useState } from "react"
import { Link } from "react-router-dom"

import "./BookshelfPage.css"

const BookshelfPage = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredManga = props.fetchedManga.filter((manga) =>
        manga.series.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const mangaElements = filteredManga.map((manga) => (
        <div key={manga._id} className="ImageGallery-photo-container">
            <Link to={"/bookshelf/" + manga._id}>
                <img src={manga.url} alt={manga.series + " volume " + manga.vol}/>
            </Link>
        </div>
    ));

    return (
        <>
            {props.isLoading && "Loading..."}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search manga..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="ImageGallery">
                {mangaElements}
            </div>
        </>
    )
}

export default BookshelfPage;