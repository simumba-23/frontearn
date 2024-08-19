import React from 'react'
import AdminTaskList from './AdminTaskList'
const adminMusic = () => {
  return (
    <AdminTaskList  
    taskType='Audio'
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
    }
    />
  )
}
export default adminMusic