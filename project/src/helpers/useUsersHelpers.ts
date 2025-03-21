import { useEffect, useState } from "react";

export function useUsersHelpers(username: string, delay = 1000) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedUsers, setFetchedUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/share`);
        const data = await response.json();
        console.log(data);
        setFetchedUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [username]);

  return { isLoading, fetchedUsers };
}
