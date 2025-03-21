import { useEffect, useState } from "react";

/**
//  * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
//  * an array of ImageData
//  *
//  * @param mangaId {string} the image ID to fetch, or all of them if empty string
//  * @param delay {number} the number of milliseconds fetching will take
//  * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
//  */
export function useUsersHelpers(username, delay=1000) {

    const [isLoading, setIsLoading] = useState(true);
    const [fetchedUsers, setFetchedUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch(`/share`);
                const data = await response.json();
                console.log(data)
                setFetchedUsers(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };
      
        fetchUsers();
    }, [username]);

    return { isLoading, fetchedUsers };
}