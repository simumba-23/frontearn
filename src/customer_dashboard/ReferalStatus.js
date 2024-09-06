import React from 'react';

const ReferralStatus = ({ status }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Referral Status</h5>
      <p className="card-text">{status}</p>
    </div>
  </div>
);
export default ReferralStatus;