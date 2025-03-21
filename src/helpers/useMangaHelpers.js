import { useEffect, useState } from "react";

const MANGA = [
    {
        id: '1',
        url: '/Manga Covers/Naruto_1.jpg',
        series: 'Naruto',
        volume: '1',
    },
    {
        id: '2',
        url: '/Manga Covers/Naruto_2.jpg',
        series: 'Naruto',
        volume: '2',
    },
    {
        id:'3',
        url: '/Manga Covers/Naruto_5.jpg',
        series: 'Naruto',
        volume: '3',
    },
    {
        id: '4',
        url: '/Manga Covers/Neon_Genesis_1.jpg',
        series: 'Neon Genesis Evangelion',
        vol: '1',
    },
    {
        id: '5',
        url: '/Manga Covers/Neon_Genesis_2.jpg',
        series: 'Neon Genesis Evangelion',
        vol: '2',
    },
    {
        id: '6',
        url: '/Manga Covers/Neon_Genesis_5.jpg',
        series: 'Neon Genesis Evangelion',
        vol: '5',
    },
    {
        id: '7',
        url: '/Manga Covers/One_Piece_1.jpg',
        series: 'One Piece',
        vol: '1',
    },
    {
        id: '8',
        url: '/Manga Covers/One_Piece_2.jpg',
        series: 'One Piece',
        vol: '2',
    },
    {
        id: '9',
        url: '/Manga Covers/One_Piece_3.jpg',
        series: 'One Piece',
        vol: '3',
    },
    // {
    //     id: '10',
    //     url: '/Manga Covers/One_Piece_6.jpg',
    //     series: 'One Piece',
    //     vol: '6',
    // },
    // {
    //     id: '11',
    //     url: '/Manga Covers/One_Piece_21.jpg',
    //     series: 'One Piece',
    //     vol: '21',
    // },
    // {
    //     id: '12',
    //     url: '/Manga Covers/One_Piece_22.jpg',
    //     series: 'One Piece',
    //     vol: '22',
    // },
    // {
    //     id: '13',
    //     url: '/Manga Covers/One_Piece_99.jpg',
    //     series: 'One Piece',
    //     vol: '99',
    // },
    // {
    //     id: '14',
    //     url: '/Manga Covers/One_Piece_100.jpg',
    //     series: 'One Piece',
    //     vol: '100',
    // },
    // {
    //     id: '15',
    //     url: '/Manga Covers/One_Piece_101.jpg',
    //     series: 'One Piece',
    //     vol: '101',
    // },
]

/**
//  * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
//  * an array of ImageData
//  *
//  * @param mangaId {string} the image ID to fetch, or all of them if empty string
//  * @param delay {number} the number of milliseconds fetching will take
//  * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
//  */
export function useMangaFetching(mangaId, authToken, delay=1000) {

    const [isLoading, setIsLoading] = useState(true);
    const [fetchedManga, setFetchedManga] = useState([]);

    useEffect(() => {

        const fetchManga = async () => {
            try {
                const response = await fetch("/api/manga", {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }}
                );
                const data = await response.json();
                setFetchedManga(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };
      
        fetchManga();
    }, [mangaId, authToken]);

    return { isLoading, fetchedManga };
}

// export function useMangaDelete(manga, delay=1000) {

//     // const [isLoading, setIsLoading] = useState(true);
//     // const [fetchedManga, setFetchedManga] = useState([]);

//     console.log(manga)

//     const deleteManga = async () => {
//         try {
//             const response = await fetch("/api/manga", {
//                     method: 'DELETE', 
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(manga),
//                 },
                
                
//                 // {
//                 // headers: {
//                 //     "Authorization": `Bearer ${authToken}`
//                 // }}
//             );
//             // const data = await response.json();
//             // setFetchedManga(data);
//         } catch (error) {
//             console.error("Error fetching images:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     deleteManga()

//     return { isLoading, fetchedManga };
// }