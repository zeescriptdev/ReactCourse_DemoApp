import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ExternalLib() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>ExternalLib</h1>
      {users.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}

      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      <Rating
        name="half-rating-read"
        defaultValue={2.5}
        precision={0.5}
        readOnly
      />
    </div>
  );
}

export default ExternalLib;
