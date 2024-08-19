import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import BaseLayout from '../components/AdminBaseLayout'
import {Link} from 'react-router-dom'

export const TaskCategory = () => {
  return (
    <BaseLayout title='Task Category'>
    <div>
        <Container>
            <Row>
                <Col md={3}>
                <div className='mb-3 video'>
                    Video
                </div>
                
                </Col>
                <Col md={3}>
                <div className='mb-3 music'>
                    Music
                </div>
                
                </Col>
                <Col md={3}>
                <div className='mb-3 podcast'>
                    Podcast
                </div>
                </Col>
                <Col md={3} as={Link} to='/AddTask'>
                <div className='mb-3 addTask' >
                    Add Task
                </div>
            
                </Col>
            </Row>
        </Container>
    </div>
    </BaseLayout>
    
  )
}
