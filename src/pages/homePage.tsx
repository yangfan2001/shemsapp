import React, { useState, useEffect } from "react";
import axios from "axios";
import constants from "../constants"; // Assuming constants is defined in this file

const getEmail = async () => {
  return await axios.get(`${constants.ENDPOINT_URL}/location/test`);
};

export default function HomePage() {
  const [res, setRes] = useState({ success: false, message: "NULL" });

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await getEmail();
        setRes(response.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, []); // Empty dependency array means this effect runs once on mount

  return <div>{res.success ? res.message : "None"}</div>;
}
