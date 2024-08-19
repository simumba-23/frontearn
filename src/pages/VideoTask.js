import React from 'react'
import TaskList from './TaskList'

const VideoTask = () => {
  
    return (
    <TaskList  
    taskType='Video'
     filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")
     }
     />
    )
}

export default VideoTask
