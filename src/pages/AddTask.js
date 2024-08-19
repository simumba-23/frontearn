import React, { useState } from 'react';
import BaseLayout from '../components/AdminBaseLayout';
import useApi from '../useApi';
import { Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

const AddTask = () => {
    const { addTask } = useApi()
    
    const [taskData, setTaskData] = useState({
        name: '',
        task_type: '',
        points: 0,
        media_url: '',
    });

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(taskData).then(response => {
            console.log('Task added', response.data);
            setTaskData({
                name: '',
                task_type: '',
                points: 0,
                media_url: '',
                // duration: '00:00:00'
            });
        }).catch(error =>{
            console.error("err:", error.response.data)
        });
    };

    return (
        <BaseLayout title="Add New Task" >
        <Container>
            <h4 className="my-2">Add New Task</h4>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Title</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={taskData.name} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Title" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="task_type" className="form-label">Task Type</label>
                    <select 
                        id="task_type" 
                        name="task_type" 
                        value={taskData.task_type} 
                        onChange={handleChange} 
                        className="form-select"
                        required
                    >
                        <option value="ad">Ad</option>
                        <option value="Audio">Audio</option>
                        <option value="Podcast">Podcast</option>
                        <option value="Video">Video</option>
                        <option value="Q">Quiz</option>

                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="points" className="form-label">Points</label>
                    <input 
                        type="number" 
                        id="points" 
                        name="points" 
                        value={taskData.points} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Points" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="media_url" className="form-label">Media URL</label>
                    <input 
                        type="url" 
                        id="media_url" 
                        name="media_url" 
                        value={taskData.media_url} 
                        onChange={handleChange} 
                        className="form-control" 
                        placeholder="Media URL" 
                        required 
                    />
                </div>
            
                <button type="submit" className="btn btn-primary mb-3">Add Task</button>
            </form>
        </Container>

        </BaseLayout>
        
    );
};

export default AddTask;
