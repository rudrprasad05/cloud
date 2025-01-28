"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { API } from "@/constants";

function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get(API + "/api/user", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.location.href = API + "auth/login"; // GitHub OAuth login URL
  };

  const handleLogout = () => {
    window.location.href = API + "auth/login"; // Logout URL
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.Name}</h1>
          <img src={user.Avatar} alt="Avatar" style={{ borderRadius: "50%" }} />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <Button onClick={handleLogin}>Login with GitHub</Button>
        </div>
      )}
    </div>
  );
}

export default App;
