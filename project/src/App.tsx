import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/nav/Header.tsx';
import { ProtectedRoute } from './pages/auth/ProtectedRoute.tsx';
import BookshelfPage from './pages/manga/BookshelfPage.tsx';
import MangaDetailPage from './pages/manga/MangaDetailPage.tsx';
import MangaReadPage from './pages/manga/MangaReadPage.tsx';
import AddMangaPage from './pages/manga/AddMangaPage.tsx';
import SharedMangaPage from './pages/manga/SharedMangaPage.tsx';
import { RegisterPage } from './pages/auth/RegisterPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';

import { useMangaFetching } from './helpers/useMangaHelpers';

import './App.css';

export interface Manga {
  _id: string;
  url: string;
  series: string;
  author: string;
  vol: string;
  pageOne: string;
}

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { isLoading, fetchedManga } = useMangaFetching("", authToken || "");
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log(fetchedManga);
    if (!isLoading) {
      setMangaList(fetchedManga);
    }
  }, [isLoading, fetchedManga]);

  const deleteManga = async (id: string) => {
    console.log(id);
    const delManga = fetchedManga.find((manga) => manga._id === id);
    console.log(delManga);

    try {
      await fetch("/api/manga", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(delManga),
      });
    } catch (error) {
      console.error("Error deleting manga:", error);
    }

    setMangaList(mangaList.filter((manga) => manga._id !== id));
  };

  const addManga = (manga: Manga) => {
    console.log(manga);
    setMangaList((prev) => {
      if (prev.some((item) => item._id === manga._id)) {
        return prev;
      }
      return [...prev, manga];
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <Header
          darkMode={darkMode}
          loggedIn={authToken}
          logout={setAuthToken}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authToken={authToken}>
                <BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshelf"
            element={
              <ProtectedRoute authToken={authToken}>
                <BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshelf/:mangaId"
            element={
              <ProtectedRoute authToken={authToken}>
                <MangaDetailPage
                  deleteManga={deleteManga}
                  mangaList={mangaList}
                  username={username}
                  authToken={authToken}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookshelf/:mangaId/1"
            element={
              <ProtectedRoute authToken={authToken}>
                <MangaReadPage
                  deleteManga={deleteManga}
                  authToken={authToken}
                  mangaList={mangaList}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addmanga"
            element={
              <ProtectedRoute authToken={authToken}>
                <AddMangaPage
                  addManga={addManga}
                  mangaList={mangaList}
                  authToken={authToken}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <ProtectedRoute authToken={authToken}>
                <SharedMangaPage
                  addManga={addManga}
                  mangaList={mangaList}
                  username={username}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage onLogin={setAuthToken} />} />
          <Route path="/login" element={<LoginPage onLogin={setAuthToken} setUser={setUsername} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
