"use server";

import { API } from "@/constants";
import axios from "axios";

export async function GetFolder() {
  const res = await axios.get<Partial<Folder>[]>(API + "folder/get-all");

  return res.data;
}

export async function GetOneFolder(id: string) {
  const res = await axios.get<Partial<Folder>>(API + "folder/get-one/" + id);

  return res.data;
}
