"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";
import Card from "@/app/components/Card";
import Loader from "@/app/components/Loader";

import { User } from "@/app/types";

const HomePage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const loadUsers = async () => {
            try{
                const { data, error } = await fetchUsers();
                if (error) throw new Error(error);
                if(!data) throw new Error('Users not found!')
                setUsers(data);
            }catch (error) {
                console.error("Error fetching users:", error);
                setError(error instanceof Error ? error.message : 'Failed to fetch users!')
            }finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="p-20 text-red-500">{error}</div>;
    if (!users) return <div className="p-20">Users not found</div>;



    return (
       <>
           <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {user ? (users.map((user: User) => (
                   <Card
                       key={user.id}
                       title={user.name}
                       description={`Albums: ${user.albums.length}`}
                       onClick={() => router.push(`/user/${user.id}`)}
                       showButton={true}
                       imageUrl=""
                   />
               ))):(" Login Please")}
           </div>
       </>
    )
}

export default HomePage;