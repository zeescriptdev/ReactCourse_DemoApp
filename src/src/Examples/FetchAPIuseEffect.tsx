import React, { useEffect, useState } from "react";

const FetchAPIuseEffect = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    return (
        <div>
            <h1>Fetch API useEffect</h1>
            {data.map((user: any) => (
                <div style={{border: "1px solid black", padding: "10px", margin: "10px"}} key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                    <p>{user.company.name}</p>
                    <p>{user.company.catchPhrase}</p>
                    <p>{user.company.bs}</p>
                </div>
            ))}
        </div>
    )
}

export default FetchAPIuseEffect;
