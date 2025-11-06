import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../FloatingDetailPanel.css'; // Import custom styles

const FloatingDetailPanel = ({ task, onClose, onPlay }) => {
    if (!task) return null;

    return (
        <div className="floating-detail-panel">
            <div className="panel-header">
                <Button variant="secondary" onClick={onClose} size="sm" className="close-btn">
                    Close
                </Button>
            </div>
            <div className="panel-body">
                <Card className="task-card shadow-sm">
                    <Card.Body>
                        <Card.Title className="task-title">{task.name}</Card.Title>
                        <Card.Text className="task-type">Type: {task.task_type}</Card.Text>
                        <Card.Text className="task-points">{task.points} points to earn</Card.Text>
                        <Button variant="primary" onClick={() => onPlay(task.media_url)} className="play-btn">
                            Play Media
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default FloatingDetailPanel;
