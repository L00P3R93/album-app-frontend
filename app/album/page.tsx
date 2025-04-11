"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAlbums } from "@/app/services/albumService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { Album } from "@/app/types";

export default function AlbumPage() {
    const [albums, setAlbums] = useState<Album[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const loadAlbums = async () => {
            try{
                const { data, error } = await fetchAlbums();
                if (error) throw new Error(error);
                if(!data) throw new Error('Albums not found!')
                setAlbums(data);
            }catch (error) {
                console.error("Error fetching albums:", error);
                setError(error instanceof Error ? error.message : 'Failed to fetch albums!')
            }finally {
                setLoading(false);
            }
        };
        loadAlbums();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="p-20 text-red-500">{error}</div>;
    if (!albums) return <div className="p-20">Albums not found</div>;


    return (
        <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold">Albums</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {albums.map((album : Album) => (
                    <Card
                        key={album.id}
                        title={album.title}
                        description={`Created by: ${album.user?.name || `User ${album.user_id}`}`}
                        onClick={() => router.push(`/album/${album.id}`)}
                        showButton={true}
                        imageUrl={album.photo?.url || ''}
                    />
                ))}
            </div>
        </div>
    );
}