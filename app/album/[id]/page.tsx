"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAlbum } from "@/app/services/albumService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";

import { Album } from "@/app/types"

export default function SingleAlbum() {
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = useParams();

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                if(!id) { throw new Error('No album ID provided!') }
                const albumId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
                const { data, error } = await fetchAlbum(albumId);
                if (error) throw new Error(error);
                if(!data) { throw new Error('Album not found!') }
                setAlbum(data);
            } catch (err){
                console.error("Error fetching album:", err);
                setError(err instanceof Error ? err.message : "Failed to load album data");
            } finally {
                setLoading(false)
            }
        };
        loadAlbum();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="p-20 text-red-500">{error}</div>;
    if (!album) return <div className="p-20">Album not found</div>;

    const userName = album.user?.name || `User ${album.user_id}`;
    const photoUrl = album.photo?.url || '';
    const albumTitle = album.title || 'No Album title';

    return (
        <div className="p-20">
            <Card
                title={albumTitle}
                description={`Created by: ${userName}`}
                showButton={false}
                imageUrl={photoUrl}
                onClick={()=> {}}
            />
        </div>
    );
}
