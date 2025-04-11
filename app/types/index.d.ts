export interface User {
    id: number;  // Changed from string to number
    name: string;
    email: string;
    username: string;
    albums: Album[];
}

export interface Photo {
    id: number;
    title: string;
    url: string;
    album_id: number;  // Foreign Key to album
    album?: Album; // Relation back to album
}

export interface Album {
    id: number;
    title: string;
    user_id: number;  // Foreign Key to user
    user?: User; // Relation back to user
    photo_id?: number; // Foreign Key to photo
    photo: Photo;  // 1 - 1 relationship
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}