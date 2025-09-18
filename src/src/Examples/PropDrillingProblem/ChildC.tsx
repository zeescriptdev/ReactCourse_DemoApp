import React from 'react';
import ChildD from './ChildD';

interface ChildCProps {
  user: any;
  theme: string;
  count: number;
}

const ChildC: React.FC<ChildCProps> = ({ user, theme, count }) => {
  return (
    <div style={{ padding: '15px', border: '2px solid #ff9ff3', margin: '10px' }}>
      <h3>ChildC Component</h3>
      <p>I receive 3 props from ChildB and pass them all to ChildD</p>
      <p>Props I don't use: user, theme, count</p>
      <ChildD user={user} theme={theme} count={count} />
    </div>
  );
};

export default ChildC;
