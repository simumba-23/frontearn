import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../FloatingDetailPanel.css' // Import custom styles

const FloatingDetailPanel = ({ task, onClose, onPlay }) => {
    if (!task) return null

    return (
        <div className="floating-detail-panel">
            <div className="panel-header">
                <Button variant="secondary" onClick={onClose} size="sm">
                    Close
                </Button>
            </div>
            <div className="panel-body">
                <Card className='shadow-sm'>
                    <Card.Body>
                        <Card.Title>{task.name}</Card.Title>
                        <Card.Text>Type: {task.task_type}</Card.Text>
                        <Card.Text>{task.points} points to earn</Card.Text>
                        <Button variant="primary" onClick={() => onPlay(task.media_url)}>
                            Play Media
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default FloatingDetailPanel
