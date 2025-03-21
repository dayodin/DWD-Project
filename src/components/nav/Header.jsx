import { NavLink as Link } from "react-router-dom";

import "./Header.css"

const Header = (props) => {

    const setLogout = () => {
        props.logout(null)
    }

    return (
        <div className="header">
            <Link to="/bookshelf" className="logo">MangaShelf</Link>
            <div className="header-right">
                {props.loggedIn != null && 
                    <>
                        <Link to="/bookshelf" className="link">Bookshelf</Link>
                        <Link to="/addmanga" className="link">Add Manga</Link>
                        <Link to="/shared" className="link">Shared</Link>
                        <button className="link" onClick={setLogout}>Logout</button>
                    </>
                }
                {props.loggedIn == null && 
                    <>
                        <Link to="/login" className="link">Login</Link>
                        <Link to="/register" className="link">Register</Link>
                    </>
                }
                {/* <Link to="/login" className="link">Login</Link> */}
                <label>
                    <input 
                        type="checkbox" 
                        checked={props.isDarkMode} 
                        onChange={props.toggleDarkMode} 
                    />
                    Darkmode 
                </label>
            </div>
        </div>
    )
}

export default Header