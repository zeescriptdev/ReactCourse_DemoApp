import React, { useRef } from "react";

const Forms = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e:any) => {
        e.preventDefault();
        // alert(inputRef.current?.value);
        console.log(inputRef.current);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default Forms;