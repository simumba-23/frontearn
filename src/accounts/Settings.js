import React from 'react'
import { Container,Form,Card,Button } from 'react-bootstrap'
import BaseLayout from '../components/BaseLayout'

export const Settings = () => {
  return (
    <BaseLayout title="Account Security" >
    <div>
        <Container>
            <Card className='border mb-5'>
                <Card.Header className='fw-bold' style={{background: '#34c0eb'}}  >Change Password & 2FA </Card.Header>
                <Card.Body>
                <Form>
                    <Form.Label>Enter Old Password</Form.Label>
                    <Form.Control 
                    
                    placeholder='Old Password'
                    />
                    <Form.Label> Enter New Password</Form.Label>
                    <Form.Control placeholder='New Password' />
                    <Form.Label>
                        Confirm New Password
                    </Form.Label>
                    <Form.Control placeholder='Confirm Password' />
                    <Button type='submit' style={{background:'#34c0eb'}} className='mt-2' >Save Changes</Button>
                </Form>
                </Card.Body>
            </Card>
            
        </Container>
    </div>
    </BaseLayout>

)
}
