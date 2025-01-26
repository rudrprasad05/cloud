"use server";

import { API } from "@/constants";
import axios from "axios";

export async function GetMedia() {
  const res = await axios.get<Partial<Media>[]>(API + "media/get-all");

  return res.data;
}
