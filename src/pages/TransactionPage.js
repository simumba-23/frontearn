import React, { useState, useEffect } from 'react';
import BaseLayout from '../components/BaseLayout';
import TransactionSummary from './customerTransactions';

const TransactionPage = () => {

  return (
    <BaseLayout title="Transaction Summary">
      <TransactionSummary
    
      />
    </BaseLayout>
  );
};

export default TransactionPage;
