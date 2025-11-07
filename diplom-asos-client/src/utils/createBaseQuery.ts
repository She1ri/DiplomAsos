import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const createBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `http://localhost:5076/api/${endpoint}`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
}