import React from 'react';
import ChildA from './ChildA';

const Parent: React.FC = () => {
  const user = { name: 'John Doe', email: 'john@example.com' };
  const theme = 'dark';
  const count = 42;

  return (
    <div style={{ padding: '20px', border: '2px solid #333', margin: '10px' }}>
      <h2>Parent Component</h2>
      <p>I have user, theme, and count that need to reach ChildD</p>
      <ChildA user={user} theme={theme} count={count} />
    </div>
  );
};

export default Parent;
