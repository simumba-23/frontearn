import React, { useState, useEffect } from 'react';
import BaseLayout from '../components/BaseLayout';
import TransactionSummary from './customerTransactions';
import Leaderboard from '../accounts/Leaderboard';
import UserHistory from '../accounts/UserHistory';

const TransactionPage = () => {

  return (
    <BaseLayout title="Your Rewards">
      <TransactionSummary />  
      <UserHistory />
    </BaseLayout>
  );
};

export default TransactionPage;
