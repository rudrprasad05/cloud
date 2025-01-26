import { Folder } from "lucide-react";
import React from "react";

interface IFolderList {
  folders: Partial<Folder>[];
}

export default function FolderList({ folders }: IFolderList) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {folders.map((folder) => (
        <div className="flex w-full bg-sidebar rounded p-4 items-center gap-4">
          <div>
            <Folder />
          </div>
          <div>{folder.name}</div>
        </div>
      ))}
    </div>
  );
}
