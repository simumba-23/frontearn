import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, CardText, Button, Alert, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import BaseLayout from '../../components/AdminBaseLayout'
import MediaPlayer from '../../components/MediaPlayer'
import './AdminTaskDetails.css' // Import the new CSS file

const AdminTaskDetails = () => {
    const [task, setTask] = useState({})
    const [loading, setLoading] = useState(true)
    const [mediaUrl, setMediaUrl] = useState(null);
    const [error, setError] = useState(null)
    const [completionMessage, setCompletionMessage] = useState('')
    const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);
    const { taskId } = useParams()
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/task/${taskId}/task_detail`)
                setTask(response.data)
                setMediaUrl(response.data.media_url);
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError('Something went wrong. Please try again!')
                setLoading(false)
            }
        }
        fetchTask()
    }, [API_URL, taskId])

    const handleEnd = () => {
        setIsSurveyEnabled(true);
        setCompletionMessage("Congratulations! You have completed the task. Please take the survey to earn your reward.");
    };

    if (loading) {
        return (
            <BaseLayout title='Task Details'>
                <div className="loading-spinner">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <p>Loading task details...</p>
                </div>
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

    return (
        <BaseLayout title='Manage Video'>
            <Row>
                <Col  className="mx-auto">
                    <Card className="mb-4 shadow-sm">
                        <CardBody>
                            <Row>
                                <Col >
                                    <MediaPlayer mediaUrl={mediaUrl} onClose={() => {}} onEnd={handleEnd} />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className='d-flex flex-column align-items-start'>
                                    <CardText as="h5" className='task-name'>{task.name}</CardText>
                                    <CardText className='task-points'>Points Reward: {task.points}</CardText>
                                </Col>
                            </Row>
                            {completionMessage && <Alert className="mt-3" variant="success">{completionMessage}</Alert>}
                            {isSurveyEnabled && (
                                <Button variant="primary" href={`/surveys/${taskId}/task`} className="mt-3 survey-button">
                                    Take Survey
                                </Button>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </BaseLayout>
    )
}

export default AdminTaskDetails
