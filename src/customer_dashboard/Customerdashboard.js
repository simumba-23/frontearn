import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import AuthContext from '../context/AuthContext';
import TransactionSummary from '../pages/customerTransactions';

const Customerdashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <BaseLayout title="Dashboard">
      {/* <p>Hi, {user.username}, welcome to earn cash by spending time in our app.</p> */}
      <div className="container">
        <div className="row">
          <TransactionSummary />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Customerdashboard;
