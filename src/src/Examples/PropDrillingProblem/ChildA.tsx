import React from 'react';
import ChildB from './ChildB';

interface ChildAProps {
  user: any;
  theme: string;
  count: number;
}

const ChildA: React.FC<ChildAProps> = ({ user, theme, count }) => {
  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', margin: '10px' }}>
      <h3>ChildA Component</h3>
      <p>I receive 3 props from Parent and pass them all to ChildB</p>
      <p>Props I don't use: user, theme, count</p>
      <ChildB user={user} theme={theme} count={count} />
    </div>
  );
};

export default ChildA;
