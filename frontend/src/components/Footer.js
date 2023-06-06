import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(date.getFullYear());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer>
      <p>&copy; All rights reserved {currentDate}</p>
    </footer>
  );
};

export default Footer;
