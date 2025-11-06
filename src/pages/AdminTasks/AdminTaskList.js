import React, { useEffect, useState } from 'react';
import { Row, Col, Alert, Card, CardBody, CardText, Button, FormControl, InputGroup } from 'react-bootstrap';
import BaseLayout from '../../components/AdminBaseLayout';
import MediaPlayer from '../../components/MediaPlayer';
import axios from 'axios';
import '../../App.css'; // Import custom styles
import FloatingDetailPanel from '../FloatingDetailPanel';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlinePlaylistAdd, MdEdit, MdDelete, MdAddCircle } from 'react-icons/md';

const AdminTaskList = ({ taskType }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completionMessages, setCompletionMessages] = useState('');
    const [playingMedia, setPlayingMedia] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/tasks/${taskType ? taskType : ''}`);
                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Something went wrong. Please try again!');
                setLoading(false);
            }
        };
        fetchData();
    }, [taskType, API_URL]);

    const handlePlayMedia = (mediaUrl) => {
        setPlayingMedia(mediaUrl);
    };

    const handleCloseMedia = () => {
        setPlayingMedia(null);
    };

    const handleSelectTask = (task) => {
        setSelectedTask(task);
        navigate(`/admintasks/${task.id}`);
    };

    const handleCloseDetails = () => {
        setSelectedTask(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTasks = tasks ? tasks.filter(task => 
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/tasks/${taskId}/delete/`);
            setTasks(tasks.filter(task => task.id !== taskId));
            setCompletionMessages('Task deleted successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to delete the task.');
        }
    };
    
    const handleEditTask = async (taskId, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/tasks/${taskId}/update/`, updatedData);
            setTasks(tasks.map(task => task.id === taskId ? response.data : task));
            setCompletionMessages('Task updated successfully!');
        } catch (error) {
            console.error(error);
            setError('Failed to update the task.');
        }
    };
    const handleAddSurvey = (taskId) => {
        // Navigate to survey creation page for the task
        navigate(`/surveys/${taskId}`);
    };
    

    if (loading) {
        return (
            <BaseLayout>
                <p>Loading tasks...</p>
            </BaseLayout>
        );
    }

    if (error) {
        return (
            <BaseLayout>
                <Alert variant='danger'>{error}</Alert>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout title='Manage Tasks'>
            {completionMessages && <Alert variant='success'>{completionMessages}</Alert>}
            <Row className='mb-4'>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search tasks..."
                            aria-label="Search tasks"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </Col>
                <Col md={4} className='text-end'>
                <Button as={Link} to='/AddTask'  className="me-2" variant="outline-success"
                > <MdAddCircle /> Add New Task</Button>
                </Col>
            </Row>
            <MediaPlayer mediaUrl={playingMedia} onClose={handleCloseMedia} />
            <FloatingDetailPanel
                task={selectedTask}
                onClose={handleCloseDetails}
                onPlay={handlePlayMedia}
                onClick={handleSelectTask}
            />
            {filteredTasks.length > 0 ? (
                <>
                    {filteredTasks.map((task) => (
                        <Row key={task.id} className="mb-4">
                            <Col>
                                <Card className='shadow-sm'>
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
                                                <CardText>Points: {task.points}</CardText>
                                                <div className="mt-3">
                                                    <Button
                                                        variant="outline-primary"
                                                        className="me-2"
                                                        onClick={() => handleEditTask(task.id)}
                                                    >
                                                        <MdEdit /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="me-2"
                                                        onClick={() => handleDeleteTask(task.id)}
                                                    >
                                                        <MdDelete /> Delete
                                                    </Button>
                                                    <Button
                                                    className='mt-2'
                                                        variant="outline-success"
                                                        onClick={() => handleAddSurvey(task.id)}
                                                    >
                                                        <MdAddCircle /> Add Survey
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </>
            ) : <Alert>No tasks added yet</Alert>}
        </BaseLayout>
    );
};

export default AdminTaskList;
