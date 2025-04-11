"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPhotos } from "@/app/services/photoService";
import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { Photo } from "@/app/types";


const PhotoPage = () => {
    const [photos, setPhotos] = useState<Photo[] | []>([]);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();


    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const { data, error } = await fetchPhotos();
                if (error) throw new Error(error);
                if (!data) throw new Error("Photos not found!");
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching photos:", error);
                setError(error instanceof Error ? error.message : "Failed to fetch photos!");
            } finally {
                setLoading(false);
            }
        };
        loadPhotos();
    }, []);

    if(loading) return <Loader />;
    if(error) return <div className="p-20 text-red-500">{error}</div>;
    if(!photos) return <div className="p-20">Photos not found</div>;

    return (
        <div className="mt-20 p-4">
            <h1 className="text-2xl font-bold">Photos</h1>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo: Photo) => (
                    <Card
                        key={photo.id}
                        title={photo.title}
                        description={`Album: ${photo.album.title} | User: ${photo.album.user.name}`}
                        onClick={() => router.push(`/photo/${photo.id}`)}
                        showButton={true}
                        imageUrl={photo.url}
                    />
                ))}
            </div>
        </div>
    );
}

export default PhotoPage;