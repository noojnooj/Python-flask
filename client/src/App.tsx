import { useEffect, useState } from "react";


export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/hello')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>    
  );
}