import * as React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useMangaFetching } from "../../helpers/useMangaHelpers";
import "./BookshelfPage.css";
import { Manga } from "../../App";

interface MangaReadPageProps {
  deleteManga: (id: string) => void;
  authToken: string | null;
  mangaList: Manga[];
}

const MangaReadPage: React.FC<MangaReadPageProps> = (props) => {
  const { mangaId } = useParams<{ mangaId: string }>();
  const { isLoading, fetchedManga } = useMangaFetching(mangaId || "", props.authToken || "", 500);
  const navigate = useNavigate();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const mangaData = fetchedManga.find((manga: Manga) => manga._id === mangaId);
  if (!mangaData) {
    return <h2>Page not found</h2>;
  }

  const handleBack = () => {
    navigate(`/bookshelf/${mangaId}`);
  };

  return (
    <div className="MangaDetailContainer">
      <img
        className="ImageDetails-img"
        src={mangaData.pageOne}
        alt={`${mangaData.series} ${mangaData.vol} Page 1`}
      />
      <h2>
        {mangaData.series} vol. {mangaData.vol}
      </h2>
      <button className="Back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default MangaReadPage;
