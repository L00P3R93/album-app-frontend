"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/app/services/userService";

import Card from "@/app/components/Card";

import { User } from "@/app/types";
import Loader from "@/app/components/Loader";

export default function UsersPage() {
    const [users, setUsers] = useState<User[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const loadUsers = async () => {
            try{
                const { data, error } = await fetchUsers();
                if (error) throw new Error(error);
                if (!data) throw new Error('Users not found!')
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
        <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: User) => (
                    <Card
                        key={user.id}
                        title={user.name}
                        description={`Albums: ${user.albums.length}`}
                        onClick={() => router.push(`/user/${user.id}`)}
                        showButton={true}
                        imageUrl=""
                    />
                ))}
            </div>
        </div>
    )
}
