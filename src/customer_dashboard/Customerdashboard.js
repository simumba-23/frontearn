import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import AuthContext from '../context/AuthContext';
import PointBalance from './PointBalance';
import RecentActivityFeed from './RecentActivityFeed';
import ReferralStatus from './ReferalStatus';
import TaskProgress from './TaskProgress';
import useApi from '../useApi';

const Customerdashboard = () => {
  const { user } = useContext(AuthContext);
  const { userTaskStats,getRecentActivities } = useApi();
  const [pointBalance, setPointBalance] = useState(0);
  const [taskProgress, setTaskProgress,getReferralStatus] = useState(0);
  const [ referralStatus,setReferralStatus] = useState( 0)
  const [recentActivity,setRecentActivity] = useState([]);

    
  useEffect(() =>{
  const  fechPointBalance = async () => {
      try {
        const response = userTaskStats();
        setPointBalance(response.data.total_points)
        console.log(pointBalance)
        setTaskProgress(response.data.task_completion_rate)
        console.log(taskProgress)
      } catch (error) {
        console.error('err:',error)
      }
  }
  fechPointBalance ();
},[])

useEffect(() =>{
  const fetchRecentActivities = async () =>{
    try {
    const response = await getRecentActivities();
    setRecentActivity(response.data)
    console.log('data:', recentActivity)

    } catch (error) {
      console.error('err:',error)
    }
    
  }
  fetchRecentActivities();
},[])
useEffect(() => {
  const fetchReferralStatus = async () =>{
    try {
      const response = await getReferralStatus();
      setReferralStatus(response.data.invitees_count)
      console.log('referrals:',referralStatus)
    } catch (error) {
      console.error('err:',error)
    }
  }
  fetchReferralStatus()
},[])
  return (
    <BaseLayout title="Customer Dashboard">
      <p>Hi, {user.username}, welcome to earn cash by spending time in our app.</p>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <PointBalance balance={pointBalance} />
          </div>
          <div className="col-md-6">
            <ReferralStatus status={referralStatus} />
          </div>
          <div className="col-md-6">
            <TaskProgress progress={taskProgress} />
          </div>
          
          <div className="col-md-6">
            <RecentActivityFeed activities={recentActivity} />
          </div>

        </div>
      </div>
    </BaseLayout>
  );
};

export default Customerdashboard;
