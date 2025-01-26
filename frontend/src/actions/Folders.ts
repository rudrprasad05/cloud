"use server";

import { API } from "@/constants";
import axios from "axios";

export async function GetFolder() {
  const res = await axios.get<Partial<Folder>[]>(API + "folder/get-all");

  return res.data;
}
