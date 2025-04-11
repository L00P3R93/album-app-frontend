import axios from "axios";

import { Album, ApiResponse } from "@/app/types";

const API_URL = "https://album-app-backend-fa1be23e8121.herokuapp.com/api/albums";

export const fetchAlbums = async (): Promise<ApiResponse<Album[]>> => {
    try{
        const response = await axios.get(API_URL);
        return { data: response.data };
    }catch (error) {
        console.error('Error fetching albums:', error);
        return { error: error instanceof Error ? error.message: 'Failed to fetch albums!' }
    }
}

export const fetchAlbum = async (id: number): Promise<ApiResponse<Album>> => {
    try{
        const response = await axios.get(`${API_URL}/${id}`);
        return { data: response.data };
    }catch (error) {
        console.error('Error fetching album:', error);
        return { error: error instanceof Error ? error.message: 'Failed to fetch album!' }
    }

}