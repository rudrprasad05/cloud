import { GetOneFolder } from "@/actions/Folders";
import React from "react";

interface IPage {
  id: string;
}

export default async function page({ id }: IPage) {
  const folder = await GetOneFolder(id);
  console.log(folder);
  return <div>page</div>;
}
