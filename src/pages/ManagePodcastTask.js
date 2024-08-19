import React from 'react'
import AdminTaskList from './AdminTaskList'

export const ManagePodcastTask = () => {
  return (
    <div>
    <AdminTaskList  
    taskType='Podcast'
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
    }
    />
    </div>
  )
}
