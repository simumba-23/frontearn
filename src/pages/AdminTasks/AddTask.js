import React, { useState } from 'react';
import BaseLayout from '../../components/AdminBaseLayout';
import useApi from '../../useApi';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTask = () => {
    const { addTask } = useApi();

    const [taskData, setTaskData] = useState({
        name: '',
        task_type: '',
        points: 0,
        media_url: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.name.trim() || !taskData.task_type || !taskData.points || !taskData.media_url.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await addTask(taskData);
            setMessage('Task added successfully');
            setTaskData({
                name: '',
                task_type: '',
                points: 0,
                media_url: '',
            });
        } catch (error) {
            setError('Error adding task: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseLayout title="Add New Task">
            <Container>
                <Card className="my-4">
                    <Card.Body>
                        <Card.Title>Add New Task</Card.Title>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={taskData.name}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="task_type">
                                <Form.Label>Task Type</Form.Label>
                                <Form.Select
                                    name="task_type"
                                    value={taskData.task_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Task Type</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Podcast">Podcast</option>
                                    <option value="Video">Video</option>
                                    <option value="Quiz">Quiz</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="points">
                                <Form.Label>Points</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="points"
                                    value={taskData.points}
                                    onChange={handleChange}
                                    placeholder="Points"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="media_url">
                                <Form.Label>Media URL</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="media_url"
                                    value={taskData.media_url}
                                    onChange={handleChange}
                                    placeholder="Media URL"
                                    required
                                />
                            </Form.Group>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Add Task'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </BaseLayout>
    );
};

export default AddTask;
