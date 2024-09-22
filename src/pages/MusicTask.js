import axios from 'axios'
import React from 'react'
import '../App.css'
import TaskList from './TaskList'
import SpotifyPlayer from '../components/SpotifyPlayer'

const MusicTask = () => {

    return (
    <>
    <TaskList taskType='Audio' 
    filterCondition={(task) => task.media_url && task.media_url.includes("youtube.com")}/>
    </>
    )
}

export default MusicTask
