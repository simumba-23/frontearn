import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Alert, Card, CardBody, CardText, Button} from 'react-bootstrap'
import { FaTrash, FaEdit,FaPlus,FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import BaseLayout from '../components/AdminBaseLayout'
const AdminTaskList = ({ taskType, filterCondition }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [completionMessages, setCompletionMessages] = useState('')
    const videoRefs = useRef([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskType ? taskType : ''}`)
                setTasks(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError('Something went wrong. Please try again!')
                setLoading(false)
            }
        }
        fetchData()
    }, [taskType])

    const handleTimeUpdate = (task, index) => {
        const video = videoRefs.current[index]
        if (video.currentTime > video.duration - 1) {
            video.pause()
            video.currentTime = video.duration - 1
        }
    }

    if(completionMessages){
        setCompletionMessages("The task is completed")
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <BaseLayout>
        {completionMessages && <Alert variant='success'>{completionMessages}</Alert>}
            {tasks.map((task, index) => (
                <div key={task.id}>
                    <Row className='mt-2'>
                        <Col md={4}>
                            <iframe
                                width="250"
                                height="200"
                                src={`https://www.youtube.com/embed/${new URL(task.media_url).searchParams.get('v')}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onTimeUpdate={() => handleTimeUpdate(task, index)}
                                ref={(el) => (videoRefs.current[index] = el)}
                            ></iframe>
                        </Col>
                        <Col md={4} className='mx-5'>
                            <Card>
                                <CardBody>
                                    <CardText>{task.name} </CardText>
                                    <CardText>{task.task_type}</CardText>
                                    <CardText>{task.points} points to earn</CardText>
                                    {/* <CardText>
                                        <Link to={`/task/${task.id}`}>View Details</Link> Link to task detail view
                                    </CardText> */}
                                    <Button variant='primary' ><FaEdit /></Button>
                                    <Button variant='danger' className='mx-2'><FaTrash /></Button>
                                    <Button variant='success' as={Link} to={`/surveys/${task.id}`}><FaPlus /></Button>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                            
                        </div>
            ))}
        </BaseLayout>
        
    )
}

export default AdminTaskList
