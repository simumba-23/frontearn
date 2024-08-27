import React,{useState} from 'react'
import { Card, Container,Button } from 'react-bootstrap'
import BaseLayout from '../components/BaseLayout'
import userProfile from '../Assets/userProfile.jpg'
import { FaEdit } from 'react-icons/fa'

const ProfileInfo = () => {
    const [profileImage , setProfileImage] = useState(userProfile)
  return (
    <>
        <BaseLayout title='Profile Details'>
        <Container>
        <Card className='border mb-5'>
        <Card.Header  className='fw-bold' style={{background:'#34c0eb'}}>Profile Information</Card.Header>
        <Card.Body className="text-center">
            <Card.Img
            variant="top"
            src={profileImage}
            alt="Profile"
            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
            />
        
            <Card.Title className="mt-3">John Doe</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">john.doe@example.com</Card.Subtitle>
            <Card.Text>
              <strong>Contact Number:</strong> (123) 456-7890
            </Card.Text>
            <Card.Text>
              <strong>Date of Birth:</strong> 17/02/2005
            </Card.Text>
           
            <Button variant="primary">
            <FaEdit className='me-2' style={{background:'#34c0eb'}} />Edit Profile</Button>
          </Card.Body>
        </Card>
        </Container>
        </BaseLayout>
        
    </>
  )
}
export default ProfileInfo;
