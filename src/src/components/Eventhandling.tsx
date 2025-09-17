import React, { useState } from 'react';

const EventHandling = () => {
    const [name, setName] = useState('');

    const handleClick = () => {
        alert('Button clicked: ' + name);
    }

    const handleInputChange = (event: any) => {
        console.log(event.target.value);
        setName(event.target.value);
    }

    return (
        <div>
            <h1>{name}</h1>
            <input type="text" onChange={handleInputChange} />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default EventHandling;