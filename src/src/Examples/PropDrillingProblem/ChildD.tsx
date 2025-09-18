import React from 'react';

interface ChildDProps {
  user: any;
  theme: string;
  count: number;
}

const ChildD: React.FC<ChildDProps> = ({ user, theme, count }) => {
  return (
    <div style={{ padding: '15px', border: '2px solid #ff6348', margin: '10px' }}>
      <h3>ChildD Component - Final Destination</h3>
      <p>I receive 3 props from ChildC and actually use them!</p>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Data I Actually Use:</h4>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Theme: {theme}</p>
        <p>Count: {count}</p>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <h4>Prop Drilling Problem:</h4>
        <p>• Parent → ChildA → ChildB → ChildC → ChildD</p>
        <p>• Each component receives props it doesn't use</p>
        <p>• ChildA, ChildB, ChildC just pass props through</p>
        <p>• Only ChildD actually uses the data</p>
        <p>• This makes code hard to maintain</p>
      </div>
    </div>
  );
};

export default ChildD;
