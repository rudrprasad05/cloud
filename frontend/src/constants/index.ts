import { Folder } from '@/types';

export const API = process.env.NEXT_PUBLIC_API_BASE_URL;
export const FRONTEND = process.env.NEXT_PUBLIC_BASE_URL;

export const RootDrive: Partial<Folder> = {
    id: '0',
    name: 'Root',
    parent: null,
    children: [],
    medias: [],
    userId: '0',
};
