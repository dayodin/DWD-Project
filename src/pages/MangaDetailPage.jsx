import { useParams, useNavigate  } from "react-router";

import { useMangaFetching } from "../helpers/useMangaFetching.js"

import "./BookshelfPage.css"

const MangaDetailPage = (props) => {
    const { mangaId } = useParams()
    const { isLoading, fetchedManga } = useMangaFetching(mangaId, 500);
    const navigate = useNavigate();

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    const mangaData = fetchedManga[0];
    if (!mangaData) {
        return <h2>Image not found</h2>;
    }

    const handleDelete = () => {
        props.deleteManga(mangaId);
        navigate('/bookshelf');
    }
    
    return (
        <div className="MangaDetailContainer">
            <img 
                className="ImageDetails-img" 
                src={mangaData.url} 
                alt={mangaData.series + mangaData.vol} 
            />
            <button onClick={handleDelete}>Remove Manga</button>
        </div>
    )
}

export default MangaDetailPage