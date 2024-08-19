import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import BaseLayout from '../components/BaseLayout'
import {Link} from 'react-router-dom'
import Navigation from '../components/Navigation'
export const CustomerTasks = () => {
  return (
    <BaseLayout title='Task List'>
     <div>
        <Container>
            <Row>
                <Navigation />
                        
                    </Row>
            </Container>

    </div>
    
    </BaseLayout>
   
  )
}
