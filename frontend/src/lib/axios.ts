import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers';

const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const axiosGlobal = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 100000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    httpAgent: agent,
    withCredentials: true,
});

// axiosGlobal.interceptors.request.use(
//     async (config) => {
//         const cookiieStore = await cookies();
//         const token = cookiieStore.get('token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token.value}`;
//         }

//         return config;
//     },
//     (error) => {
//         console.error('Request Error:', error);
//         return Promise.reject(error);
//     }
// );
