import React, { useState } from 'react';

const Counter = () => {
  const [name, setName] = useState('Zeeshan');
  const [age, setAge] = useState(25);

  return <>
  <div> {name} is {age} years old</div>
  <button onClick={() => setAge(age + 1)}>Birthday!</button>
  </>
};

export default Counter;