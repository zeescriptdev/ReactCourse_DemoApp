import React from "react";

const Counter = React.memo(({count}: {count: number}) => {
  console.log("Counter --->>>>", count);
  return <div>Counter: {count}</div>;
});

export default Counter;