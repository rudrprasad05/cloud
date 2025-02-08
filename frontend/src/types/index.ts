export type Folder = {
    id: string;
    name: string;
    parent: Folder | null;
    children: Folder[];
    medias: Media[];
    user: User;
    userId: string;
    createdAt: string;
    updatedAt: string | null;
};

export type Media = {
    id: string;
    name: string;
    type: MediaType;
    source: string;
    folder: Folder;
    folderId: string;
    createdAt: string;
    updatedAt: string | null;
    size?: number;
    star: boolean;
};

type MediaType = 0 | 1;

type User = {};
