import React from 'react';

const TaskProgress = ({ progress }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Task Progress</h5>
      <p className="card-text">{progress}</p>
    </div>
  </div>
);

export default TaskProgress