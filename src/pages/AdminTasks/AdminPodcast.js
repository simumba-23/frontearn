import React from 'react'
import AdminTaskList from './AdminTaskList'

const adminPodcast = () => {
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

export default adminPodcast