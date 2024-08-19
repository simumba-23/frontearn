import React, {useContext} from 'react';
import BaseLayout from '../components/BaseLayout';
import AuthContext from '../context/AuthContext';

const Customerdashboard = () => {
  const {user} = useContext(AuthContext)
  console.log('customer:',user)
  
  return (
    <BaseLayout title="Customer Dashboard">
    <p>Hi,{user.username} , welcome to earn cash by time spending in our app</p>
      <div>
        <canvas
          className="my-4 w-100 chartjs-render-monitor"
          id="myChart"
          width="284"
          height="119"
          style={{ display: 'block', width: 284, height: 119 }}
        ></canvas>
      </div>
    </BaseLayout>
  );
};

export default Customerdashboard;
