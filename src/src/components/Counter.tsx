import React, { useEffect, useState } from "react";

const Counter = (props:any) => {
  console.log("props", props);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  return (
    <>
      <div>
        User: {props.user?.name || "No user"}
        <p>Count : {count}</p>
      </div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};

export default Counter;
