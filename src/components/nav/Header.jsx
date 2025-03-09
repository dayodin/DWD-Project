import { NavLink as Link } from "react-router-dom";

import "./Header.css"

const Header = (props) => {

    return (
        <div className="header">
            <Link to="/bookshelf" className="logo">MangaShelf</Link>
            <div className="header-right">
                <Link to="/bookshelf" className="link">Bookshelf</Link>
                <Link to="/addmanga" className="link">Add Manga</Link>
                <Link to="/signin" className="link">Sign In</Link>
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
        // <nav className="bg-white border-gray-200 dark:bg-gray-900">
        //     <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //         <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        //             {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
        //             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BookShelf</span>
        //         </a>
        //         <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
        //             <span className="sr-only">Open main menu</span>
        //             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        //             </svg>
        //         </button>
        //         <div className=" w-full md:block md:w-auto" id="navbar-default">
        //             <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //                 <li>
        //                     <Link to="/bookshelf" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Bookshelf</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/addmanga" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Add Book</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/signin" className="block py-2 px-3 mr-6 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign In</Link>
        //                 </li>
        //                 <li>
        //                     <button className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dark Mode</button>
        //                     {/* <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">D</a> */}
        //                 </li>
        //             </ul>
        //         </div>
        //         {/* <div className="hidden w-full" id="navbar-hamburger">
        //             <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        //                 <li>
        //                     <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm dark:bg-blue-600" aria-current="page">Home</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
        //                 </li>
        //                 <li>
        //                     <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
        //                 </li>
        //             </ul>
        //         </div> */}
        //     </div>
        // </nav>
    )
}

export default Header