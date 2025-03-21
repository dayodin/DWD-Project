import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from './components/nav/Header.jsx'
import { ProtectedRoute } from './pages/auth/ProtectedRoute.jsx';
import BookshelfPage from './pages/manga/BookshelfPage.jsx'
import MangaDetailPage from './pages/manga/MangaDetailPage.jsx';
import MangaReadPage from './pages/manga/MangaReadPage.jsx';
import AddMangaPage from './pages/manga/AddMangaPage.jsx';
import SharedMangaPage from './pages/manga/SharedMangaPage.jsx';
import { RegisterPage } from './pages/auth/RegisterPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';

import { useMangaFetching } from './helpers/useMangaHelpers.js';

import './App.css'

function App() {
  // This is where the API call would go
  const [username, setUsername] = useState(null)
  const [authToken, setAuthToken] = useState(null);
  const { isLoading, fetchedManga } = useMangaFetching("", authToken);
  const [mangaList, setMangaList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log(fetchedManga);
    if (!isLoading) {
      setMangaList(fetchedManga);
    }
  }, [isLoading, fetchedManga]);

  const deleteManga = async (id) => {
    console.log(id);
    const delManga = fetchedManga.find(manga => manga._id === id)

    console.log(delManga)

    try {
      const response = await fetch("/api/manga", {
              method: 'DELETE', 
              headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify(delManga),
          },
      );
    } catch (error) {
        console.error("Error fetching images:", error);
    }

    setMangaList(mangaList.filter(manga => manga._id !== id))
  }

  const addManga = (manga) => {
    console.log(manga)
    setMangaList(prev => {
      if (prev.some(item => item._id === manga._id)) {
        return prev; 
      }
      return [...prev, manga]; 
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <Header darkMode={darkMode} loggedIn={authToken} logout={setAuthToken} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" 
            element={
              <ProtectedRoute authToken={authToken}>
                <BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />
              </ProtectedRoute>
            } 
          />  
          <Route path="/bookshelf" 
            element={
              <ProtectedRoute authToken={authToken}>
                <BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />
              </ProtectedRoute>
            } 
          />
          <Route path="/bookshelf/:mangaId" 
            element={
              <ProtectedRoute authToken={authToken}>
                <MangaDetailPage deleteManga={deleteManga} mangaList={mangaList} username={username} authToken={authToken} />
              </ProtectedRoute>
            } 
          />
          <Route path="/bookshelf/:mangaId/1" 
            element={
              <ProtectedRoute authToken={authToken}>
                <MangaReadPage deleteManga={deleteManga} authToken={authToken} mangaList={mangaList} />
              </ProtectedRoute>
            } 
          />
          <Route path="/addmanga" 
            element={
              <ProtectedRoute authToken={authToken}>
                <AddMangaPage addManga={addManga} mangaList={mangaList} authToken={authToken} />
              </ProtectedRoute>
            } 
          />
          <Route path="/shared" 
            element={
              <ProtectedRoute authToken={authToken}>
                <SharedMangaPage addManga={addManga} mangaList={mangaList} username={username} />
              </ProtectedRoute>
            } 
          />
          <Route path="/register" element={<RegisterPage onLogin={setAuthToken} />} />
          <Route path="/login" element={<LoginPage onLogin={setAuthToken} setUser={setUsername} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
