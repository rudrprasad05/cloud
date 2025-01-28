import { API } from "@/constants";
import axios from "axios";
import React from "react";

export default async function page() {
  const res = await axios.post(API + "auth/login", {});
  return <div>page</div>;
}
