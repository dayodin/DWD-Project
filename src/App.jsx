import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Header from './components/nav/Header.jsx'
import BookshelfPage from './pages/BookshelfPage.jsx'
import MangaDetailPage from './pages/MangaDetailPage.jsx';
import AddMangaPage from './pages/AddMangaPage.jsx';
import SignInPage from './pages/SignInPage.jsx';

import { useMangaFetching } from './helpers/useMangaFetching.js';

import './App.css'

function App() {
  // This is where the API call would go
  const { isLoading, fetchedManga } = useMangaFetching("");
  const [mangaList, setMangaList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setMangaList(fetchedManga);
    }
  }, [isLoading, fetchedManga]);

  const deleteManga = (id) => {
    const updatedList = mangaList.filter((manga) => manga.id !== id);
    setMangaList(updatedList);
  }

  const addManga = (manga) => {
    console.log(manga)
    setMangaList(prev => {
      if (prev.some(item => item.id === manga.id)) {
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
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />} />
          <Route path="/bookshelf" element={<BookshelfPage isLoading={isLoading} fetchedManga={mangaList} />} />
          <Route path="/bookshelf/:mangaId" element={<MangaDetailPage deleteManga={deleteManga} mangaList={mangaList} />} />
          <Route path="/addmanga" element={<AddMangaPage addManga={addManga} mangaList={mangaList}/>} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
