import React from 'react';

const Welcome = (props: { name: string }) => {
  return (
    <h1>Welcome, {props.name}!!</h1>
  )
}

export default Welcome;