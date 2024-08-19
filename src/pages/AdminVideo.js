import React from 'react'
import AdminTaskList from './AdminTaskList'

const adminVideo = () => {
  return (
    <div>
    <AdminTaskList  
    taskType='Video'
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
    }
    
    />
    </div>
  )
}

export default adminVideo