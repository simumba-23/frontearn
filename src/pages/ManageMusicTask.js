import React from 'react';
import AdminTaskList from './AdminTaskList';

export const ManageMusicTask = () => {
  return (
    <div>
    <AdminTaskList  
    taskType='Audio'
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
    }
    />
    </div>
  )
}
