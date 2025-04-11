"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPhoto, updatePhoto } from "@/app/services/photoService";

import Loader from "@/app/components/Loader";
import Card from "@/app/components/Card";
import { Photo } from "@/app/types";


export default function SinglePhoto() {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        const loadPhoto = async () => {
            try {
                if (!id) { throw new Error("No photo ID provided"); }

                // Convert id to string if it's an array
                const photoId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
                const { data, error } = await fetchPhoto(photoId);
                if (error) { throw new Error(error); }
                if (!data) { throw new Error("Photo not found"); }

                setPhoto(data);
                setTitle(data.title);
                setUrl(data.url);
            } catch (error) {
                console.error("Error fetching photo: ", error);
                setError(error instanceof Error ? error.message : "Failed to load photo data");
            } finally {
                setLoading(false)
            }
        }
        loadPhoto();
    }, []);

    const handleSave = async () => {
        if (!photo) return;
        const { data, error } = await updatePhoto(photo.id, { title, url });
        if (error) return alert("Failed to update photo!");

        setPhoto(data);
        setEditing(false);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setUrl(fileUrl);
        }
    };

    if (loading) return <Loader/>;
    if (error) return <div className="p-20 text-red-500">{error}</div>
    if (!photo) return <div className="p-20">Photo not found</div>

    const albumTitle = photo.album.title || 'No Album Title';
    const userName = photo.album.user.name || 'No User Name';

    return (
        <div className="p-20">
            <Card
                title={title}
                description={`Album: ${albumTitle} | User: ${userName}`}
                onClick={() => {}}
                showButton={false}
                imageUrl={url}
            />

            <div className="mt-5 space-y-4">
                {editing ? (
                    <div className="max-w-lg">
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo Title" required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="album_photo_help" id="album_photo" type="file" onChange={handleUpload} />
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="album_photo_help">This is for uploading Album Photo</div>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <button onClick={handleSave} className="flex items-center gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Save
                            </button>
                            <button onClick={() => setEditing(false)} className="flex items-center gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => setEditing(true)} className="flex items-center gap-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Edit Photo
                    </button>
                )}
            </div>
        </div>
    );
}