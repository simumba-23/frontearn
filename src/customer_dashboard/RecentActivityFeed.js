import React from 'react';
const RecentActivityFeed = ({ activities }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Recent Activity</h5>
      <ul className="list-group list-group-flush">
      {!activities ? <> 
        {activities.map((activity, index) => (
          <li className="list-group-item" key={index}>
            {activity}
          </li>
        ))}
      </> : <li  className="list-group-item" > No recent activity available</li>
  }
        
      </ul>
    </div>
  </div>
);

export default RecentActivityFeed;
