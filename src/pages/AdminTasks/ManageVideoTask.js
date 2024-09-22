import React from 'react'
import AdminTaskList from './AdminTaskList'
export const ManageVideoTask = () => {
  return (
    <AdminTaskList  
    taskType='Video'
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
    }
    />
  )
}
