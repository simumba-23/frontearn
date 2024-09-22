import React from 'react';
import RevenueHeader from './RevenueHeader';
import RevenueWidgets from './RevenueWidgets';
import RevenueTable from './RevenueTable';
// import RevenueCharts from './RevenueCharts';
import PayoutManagement from './PayoutManagement';
// import Alerts from './Alerts';
import RevenueFooter from './RevenueFooter';
import BaseLayout from '../components/AdminBaseLayout';

const RevenueManagementPage = () => {
    // Define your state and handlers here

    return (
        <BaseLayout >
         <div>
            <RevenueHeader />
            <RevenueWidgets />
            <RevenueTable />
            {/* <RevenueCharts /> */}
            <PayoutManagement />
            <RevenueFooter />
        </div>
        </BaseLayout>
       
    );
};

export default RevenueManagementPage;
