import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CardText, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';
import MediaPlayer from '../components/MediaPlayer';

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
                <p>Loading task details...</p>
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
                <Col md={8} className="mx-auto">
                    <Card className="mb-4 shadow-sm">
                        <CardBody>
                            <Row>
                                <Col md={12}>
                                    <MediaPlayer mediaUrl={mediaUrl} onClose={handleClose} onEnd={handleEnd} />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col className="d-flex">
                                    <CardText as="h5" className="mx-3">{task.name}</CardText>
                                    <CardText>{task.description}</CardText>
                                    <CardText>Points Reward: {task.points}</CardText>
                                </Col>
                                {completionMessage && <Alert className="mt-3" variant="success">{completionMessage}</Alert>}
                                {isSurveyEnabled && (
                                    <Button variant="primary" href={`/surveys/${taskId}/task`} className="survey-button">
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
