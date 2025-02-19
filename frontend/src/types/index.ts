export type Folder = {
    id: string;
    name: string;
    parent: Folder | null;
    parentId: string | null;
    children: Folder[];
    medias: Media[];
    user: User;
    userId: string;
    createdAt: string;
    updatedAt: string | null;
    star: boolean;
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
    isDeleted: boolean;
};

export type SharedUsers = {};

export type Share = {
    id: string;
    type: number;
    url: string;
    sharedUsers: SharedUsers[];
    mediaId: string;
    media: Media;
};

type MediaType = 0 | 1;

type User = {};
