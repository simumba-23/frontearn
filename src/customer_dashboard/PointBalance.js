import React from 'react';

const PointBalance = ({ balance }) => (
  <div className="card border shadow-sm">
    <div className="card-body">
    <h5 className="card-title">Point Balance</h5>
    <p className="card-text">{balance}</p>
    </div>
  </div>
);

export default PointBalance;