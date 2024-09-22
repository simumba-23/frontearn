import React, { useEffect, useState } from 'react'
import { Row, Col, Alert, Card, CardBody, CardText, Button, FormControl, InputGroup } from 'react-bootstrap'
import BaseLayout from '../../components/AdminBaseLayout'
import MediaPlayer from '../../components/MediaPlayer'
import axios from 'axios'
import '../../App.css' // Import custom styles
import FloatingDetailPanel from '../FloatingDetailPanel'
import { useNavigate, Link } from 'react-router-dom'
import { MdOutlinePlaylistAdd } from 'react-icons/md'

const AdminTaskList = ({ taskType }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [completionMessages, setCompletionMessages] = useState('')
    const [playingMedia, setPlayingMedia] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskType ? taskType : ''}`)
                setTasks(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError('Something went wrong. Please try again!')
                setLoading(false)
            }
        }
        fetchData()
    }, [taskType, API_URL])

    const handlePlayMedia = (mediaUrl) => {
        setPlayingMedia(mediaUrl)
    }

    const handleCloseMedia = () => {
        setPlayingMedia(null)
    }

    const handleSelectTask = (task) => {
        setSelectedTask(task)
        navigate(`/admintasks/${task.id}`)
    }

    const handleCloseDetails = () => {
        setSelectedTask(null)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredTasks = tasks ? tasks.filter(task => 
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []

    if (loading) {
        return (
            <BaseLayout>
                <p>Loading tasks...</p>
            </BaseLayout>
        )
    }

    if (error) {
        return (
            <BaseLayout>
                <Alert variant='danger'>{error}</Alert>
            </BaseLayout>
        )
    }

    if (tasks.length === 0) {
        return (
            <BaseLayout>
                <Alert variant='info'>No tasks available.</Alert>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout title='Manage Tasks'>
            {completionMessages && <Alert variant='success'>{completionMessages}</Alert>}
            <Row className='mb-4'>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search tasks..."
                            aria-label="Search tasks"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <Button as={Link} to='/AddTask'><MdOutlinePlaylistAdd /> Add Task</Button>
                </Col>
            </Row>
            <MediaPlayer mediaUrl={playingMedia} onClose={handleCloseMedia} />
            <FloatingDetailPanel
                task={selectedTask}
                onClose={handleCloseDetails}
                onPlay={handlePlayMedia}
                onClick={handleSelectTask}
            />
            {filteredTasks.map((task) => (
                <Row key={task.id} className="mb-4">
                    <Col>
                        <Card className='shadow-sm' onClick={() => handleSelectTask(task)}>
                            <CardBody>
                                <Row>
                                    <Col md={5} className="position-relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${new URL(task.media_url).searchParams.get('v')}/hqdefault.jpg`}
                                            alt={task.name}
                                            className="img-fluid video-thumbnail"
                                            onClick={() => handlePlayMedia(task.media_url)}
                                        />
                                        <div className="play-button" onClick={() => handlePlayMedia(task.media_url)}></div>
                                    </Col>
                                    <Col md={6} className='d-flex flex-column justify-content-center'>
                                        <CardText as="h5">{task.name}</CardText>
                                        <CardText>Type: {task.task_type}</CardText>
                                        <CardText>{task.points} points to earn</CardText>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ))}
        </BaseLayout>
    )
}

export default AdminTaskList
