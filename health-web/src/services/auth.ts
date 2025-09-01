import {http} from "../lib/http"

export interface LoginRequest{
    userName: string;
    password: string;
}

export interface LoginResponse{
    accessToken: string;
    refreshToken: string;
}

export interface MeResponse{
    name: string;
}

export const auth = {
    login: (userName: string, password: string) => {
        return http<LoginResponse, LoginRequest>("api/auth/login",
        {
            method: "POST",
            body: { userName, password}
        });
    },
    me: () => {
        return http<MeResponse>("api/auth/me",
        {
            method: "GET",
            withAuth: true
        });
    },
    userDetails: () => {
        return http<MeResponse>("api/userdetails/getUserDetails",
        {
            method: "GET",
            withAuth: true
        });
    }
}