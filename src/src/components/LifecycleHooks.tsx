import React, { useState, useRef, useLayoutEffect, useEffect } from "react";

function LifecycleHooks() {
 const boxRef = useRef<HTMLDivElement>(null);
 const [width, setWidth] = useState(0);
 const [boxWidth, setBoxWidth] = useState(0);

 useLayoutEffect(() => {
  if(boxRef.current) {
    const w = boxRef.current.getBoundingClientRect().width;
    setWidth(w);
    console.log("useLayoutEffect width:", w);
  }
 }, [boxWidth]);

 useEffect(() => {
  if(boxRef.current) {
    const w = boxRef.current.getBoundingClientRect().width;
    console.log("useEffect width:", w);
  }
 }, [boxWidth]);

 useEffect(() => {
  setTimeout(() => setBoxWidth(200), 100);
 }, []);

  return (
    <div>
      <div ref={boxRef}
      style={{width: `${boxWidth}px`, height: "100px", background: "lightblue"}}
      >
        <p>Box width: {width}px</p>
        I am a Box
        
        
        </div>
    </div>
  );
}

export default LifecycleHooks;
