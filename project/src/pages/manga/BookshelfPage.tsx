import * as React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./BookshelfPage.css";
import { Manga } from "../../App";

interface BookshelfPageProps {
  isLoading: boolean;
  fetchedManga: Manga[];
}

const BookshelfPage: React.FC<BookshelfPageProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredManga = props.fetchedManga.filter((manga) =>
    manga.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mangaElements = filteredManga.map((manga) => {
    if (typeof manga._id === 'string' && manga._id.length > 10) {
      return null;
    }

    return (
      <div key={manga._id} className="ImageGallery-photo-container">
        <Link to={"/bookshelf/" + manga._id}>
          <img src={manga.url} alt={`${manga.series} volume ${manga.vol}`} />
        </Link>
      </div>
    )
  });

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
      <div className="ImageGallery">{mangaElements}</div>
    </>
  );
};

export default BookshelfPage;
