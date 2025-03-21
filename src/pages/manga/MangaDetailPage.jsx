import { useState } from "react";
import { useParams, useNavigate  } from "react-router";
import { v4 as uuidv4 } from 'uuid';

import { useMangaFetching } from "../../helpers/useMangaHelpers.js"
import { useUsersHelpers } from "../../helpers/useUsersHelpers.js";
import { sendPostRequest } from "../../helpers/sendPostRequest.js";

import "./BookshelfPage.css"

const MangaDetailPage = (props) => {
    const { mangaId } = useParams()
    const { isLoading, fetchedManga } = useMangaFetching(mangaId, props.authToken, 500);
    const [showModal, setShowModal] = useState(false);
    const { isUserLoading, fetchedUsers } = useUsersHelpers("", 500);
    const navigate = useNavigate();

    console.log(fetchedUsers)

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    const mangaData = fetchedManga.find(manga => manga._id === mangaId);
    if (!mangaData) {
        return <h2>Book not found</h2>;
    }

    const handleDelete = () => {
        props.deleteManga(mangaId);
        navigate('/bookshelf');
    }

    const handleRead = () => {
        navigate(`/bookshelf/${mangaId}/1`)
    }

    const handleShare = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleOnShare = async (username) => {
        const url = mangaData.url
        const series = mangaData.series
        const vol = mangaData.vol
        const response = await sendPostRequest("/share", { username, url, series, vol });
                    
        if (response.status === 200) {
            console.log("worked")
        } else {
            return "Unexpected error, please try again.";
        }
    }
    
    const userList = fetchedUsers.filter(item => item != props.username).map(item => ({ id: uuidv4(), username: item })) || [];

    return (
        <div className="MangaDetailContainer">
            <img 
                className="ImageDetails-img" 
                src={mangaData.url} 
                alt={mangaData.series + " " + mangaData.vol} 
            />
            <h2>{mangaData.series} vol. {mangaData.vol}</h2>
            <h3>By {mangaData.author}</h3>
            <div>
                <button className="Read-button" onClick={handleRead}>Read</button>
                <button className="Read-button" onClick={handleShare}>Share</button>
            </div>
            <button className="remove-button" onClick={handleDelete}>Remove Manga</button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Select a User to Share With</h2>
                        <div className="user-list">
                            {userList.length > 0 ? (
                                userList.map((user) => (
                                    <div key={user.id} className="user-item">
                                        {user.username}
                                        <button onClick={() => handleOnShare(user.username)} className="share-share-button">Share</button>
                                    </div>
                                ))
                            ) : (
                                <p>No users available</p>
                            )}
                        </div>
                        <button onClick={closeModal} className="close-modal-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MangaDetailPage