import React from "react"
import { Link } from "react-router-dom"

import "./BookshelfPage.css"

const BookshelfPage = (props) => {

    const mangaElements = props.fetchedManga.map((manga) => (
        <div key={manga._id} className="ImageGallery-photo-container">
            <Link to={"/bookshelf/" + manga._id}>
                <img src={manga.url} alt={manga.series + " volume " + manga.vol}/>
            </Link>
        </div>
    ));

    return (
        <>
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {mangaElements}
            </div>
        </>
    )
}

export default BookshelfPage;