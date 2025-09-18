import React from 'react';
import ChildC from './ChildC';

interface ChildBProps {
  user: any;
  theme: string;
  count: number;
}

const ChildB: React.FC<ChildBProps> = ({ user, theme, count }) => {
  return (
    <div style={{ padding: '15px', border: '2px solid #96ceb4', margin: '10px' }}>
      <h3>ChildB Component</h3>
      <p>I receive 3 props from ChildA and pass them all to ChildC</p>
      <p>Props I don't use: user, theme, count</p>
      <ChildC user={user} theme={theme} count={count} />
    </div>
  );
};

export default ChildB;
