import React, { useState } from 'react';
import BaseLayout from '../../components/AdminBaseLayout';
import useApi from '../../useApi';
import { Container, Card, Form, Button, Alert, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTask = () => {
    const { addTask } = useApi();

    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
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
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.name.trim() || !taskData.task_type || !taskData.points || !taskData.media_url.trim()) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            await addTask(taskData);
            setMessage('Task added successfully!');
            setTaskData({
                name: '',
                description: '',
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
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Card className="p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Add New Task</Card.Title>
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>
                                    Task Title{' '}
                                    <OverlayTrigger overlay={<Tooltip>Enter a descriptive task title</Tooltip>}>
                                        <i className="bi bi-info-circle" style={{ cursor: 'pointer' }}></i>
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={taskData.name}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={taskData.description}
                                    onChange={handleChange}
                                    placeholder="Type description here..."
                                    rows={3}
                                    required
                                />
                                <small className="text-muted">
                                    {taskData.description.length}/500 characters
                                </small>
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
                                    min="1"
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
                            <div className="text-center">
                                <Button type="submit" variant="info" disabled={loading} className="w-100">
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Add Task'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </BaseLayout>
    );
};

export default AddTask;
