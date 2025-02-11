import { Folder } from '@/types';

export const API = 'https://localhost:7138/api/';

export const RootDrive: Partial<Folder> = {
    id: '0',
    name: 'Root',
    parent: null,
    children: [],
    medias: [],
    userId: '0',
};
