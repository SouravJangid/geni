// src/hooks/useUserList.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  fullName: string;
  role: string;
}

const useUserList = (userType: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await axios
          .post('/api/user/profile/list', {
            userType,
          })
          .then((response) => {
            if (response.data.data.code === 1) {
              setUsers(response.data.data.users);
            }
          })
          .catch((error) => {
            console.error(`Error fetching ${userType}s:`, error);
          });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType]);

  return { users, loading };
};

export default useUserList;
