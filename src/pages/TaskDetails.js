import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardText, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import MediaPlayer from '../components/MediaPlayer';
import { GiTwoCoins } from "react-icons/gi";
import "../App.css"

const TaskDetails = () => {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [error, setError] = useState(null);
    const [completionMessage, setCompletionMessage] = useState('');
    const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);
    const { taskId } = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${API_URL}/task/${taskId}/task_detail`);
                setTask(response.data);
                setMediaUrl(response.data.media_url);
                setLoading(false);
            } catch (error) {
                setError('Something went wrong. Please try again!');
                setLoading(false);
            }
        };
        fetchTask();
    }, [taskId, API_URL]);

    const handleEnd = () => {
        setIsSurveyEnabled(true);
        setCompletionMessage('Congratulations! You have completed the task. Please take the survey to earn your reward.');
    };

    const handleClose = () => {
        navigate('/tasks/Video');
    };

    if (loading) {
        return (
            <BaseLayout>
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading task details...</p>
                </div>
            </BaseLayout>
        );
    }

    if (error) {
        return (
            <BaseLayout>
                <Alert variant="danger">{error}</Alert>
            </BaseLayout>
        );
    }

    if (!task) {
        return (
            <BaseLayout>
                <p>No task details available.</p>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Row>
                <Col className="mx-auto">
                    <Card className="mb-4 shadow-lg rounded">
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <MediaPlayer mediaUrl={mediaUrl} onClose={handleClose} onEnd={handleEnd} />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col>
                                    <CardText as="h5" className="text-primary">{task.name}</CardText>
                                    <CardText>{task.description} HAHAAHHAHHAHAHAHAHHHHHHHHHHHH</CardText>
                                    <CardText><GiTwoCoins /> <strong>{task.points}</strong></CardText>
                                </Col>
                                {completionMessage && (
                                    <Alert variant="success" className="mt-3">
                                        {completionMessage}
                                    </Alert>
                                )}
                                {isSurveyEnabled && (
                                    <Button variant="primary" href={`/surveys/${taskId}/task`} className="mt-3 w-100">
                                        Take Survey
                                    </Button>
                                )}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </BaseLayout>
    );
};

export default TaskDetails;
