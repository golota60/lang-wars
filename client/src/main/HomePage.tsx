import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { getFromStorage } from "../utils/session";
import { verifyToken } from "../utils/fetches";

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = getFromStorage("lang-wars-token");
    if (token) {
      //verify token
      verifyToken(token).then(data => {
        if (data.status === 200) {
          setLoading(false);
        }
      });
    } else {
    }
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  } else {
    return <>Congrats! You're logged in!</>;
  }
};

export default HomePage;
