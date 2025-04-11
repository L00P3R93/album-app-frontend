"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchUser } from "@/app/services/userService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { User, Album } from "@/app/types"

export default function SingleUser() {
    const [singleUser, setSingleUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { id } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!id) { throw new Error("No user ID provided"); }

                // Convert id to string if it's an array
                const userId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
                const { data, error } = await fetchUser(userId);
                if (error) { throw new Error(error); }
                if (!data) { throw new Error("User not found"); }
                setSingleUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err instanceof Error ? err.message : "Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="p-20 text-red-500">{error}</div>;
    if (!singleUser) return <div className="p-20">User not found</div>;

    const userName = singleUser.name || 'No User Name';
    const albumCount = singleUser.albums ? singleUser.albums.length : 0;
    const albums = singleUser.albums || [];

    return (
        <div className="p-20">
            <Card
                title={userName}
                description={`Albums Owned: ${albumCount}`}
                onClick={() => {}}
                showButton={false}
                imageUrl=""
            />
            <div className="mt-5">
                <h4 className="text-2xl font-semibold mb-4">Albums Owned by {userName}:</h4>


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Album Photo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Album Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Photo Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {albums.map((album: Album) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-sm" src={album.photo?.url || ''} alt={album.photo?.title || 'ALBUM_IMG'}/>
                                </th>
                                <td className="px-6 py-4">
                                    {album.title || 'No Album Title'}
                                </td>
                                <td className="px-6 py-4">
                                    {album.photo?.title || 'No Photo Title'}
                                </td>
                                <td className="px-6 py-4">
                                    <a onClick={() => {router.push(`/album/${album.id}`)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
}
