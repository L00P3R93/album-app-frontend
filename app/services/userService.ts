import axios from "axios";
import { User, ApiResponse} from "@/app/types";

const API_URL = "https://album-app-backend-fa1be23e8121.herokuapp.com/api/users";

export const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
    try {
        const response = await axios.get(API_URL);
        return { data: response.data };
    }catch (error) {
        console.error("Error fetching users:", error);
        return { error: error instanceof Error ? error.message : 'Failed to fetch users!' }
    }
}

export const fetchUser = async (id: number): Promise<ApiResponse<User>> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return { data: response.data };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { error: error instanceof Error ? error.message : 'Failed to fetch user!' }
    }
}