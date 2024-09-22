import React, { useEffect, useState } from 'react';
import { Card, Container, Button ,Form} from 'react-bootstrap';
import { FaEdit,FaPhone, FaPhoneAlt ,FaMale,FaFemale} from 'react-icons/fa';
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import useApi from '../useApi';
import userProfile from '../Assets/userProfile.jpg'
import BaseLayout from '../components/AdminBaseLayout';


const UserInfo = () => {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        phone_number: '',
        sex: '',
    });
    const { getProfileData,updateProfileData } = useApi()
    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await getProfileData();
            setProfileData(response.data)
            console.log('data:',profileData)
          } catch (error) {
            console.error('error',error)
          }

        };
        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormState({
          ...formState,
          [name]: value,
      });
  };
  const handleEditClick = () => {
    setFormState({
        username: profileData.username,
        email: profileData.email,
        phone_number: profileData.phone_number,
        sex: profileData.sex,
    });
    setIsEditing(true);
};

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          await updateProfileData(formState);
          setProfileData(formState);
          setIsEditing(false);
      } catch (error) {
          console.error('Error updating profile data:', error);
      }
  };
    if (!profileData) {
        return <BaseLayout title='Profile Details'> <div>Loading...</div></BaseLayout>
    }
    const profileImage = profileData.profile_image || userProfile; 

    return (
        <BaseLayout title='Profile Details'>
            <Container>
                <Card className='border mb-5'>
                    <Card.Header className='fw-bold' style={{ background: '#34c0eb' }}>Profile Information</Card.Header>
                    <Card.Body>
                        {/* Placeholder for profile image */}
                        <Card.Img
                            variant="top"
                            src={profileImage}
                            alt="Profile"
                            className=''
                            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }}
                        />
                        {  !isEditing ? <>
                          <Card.Title className="mt-3">
                        <CiUser /> {profileData.username}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                        <MdOutlineMail /> {profileData.email}</Card.Subtitle>
                        <Card.Text>
                        <FaPhoneAlt />
                            <strong></strong>
                            {profileData.phone_number}
                        </Card.Text>
                        <Card.Text>
                        {profileData.sex === 'Male'? <FaMale /> : <FaFemale />}
                            {profileData.sex}
                        </Card.Text>
                        <Button variant="primary" onClick={handleEditClick}>
                                    <FaEdit className='me-2' style={{ background: '#34c0eb' }} />Edit Profile
                                </Button>
                        
                        </> :(
                          <Form onSubmit={handleFormSubmit}>
                          <Form.Group className="mb-3">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                  type="text"
                                  
                                  name="username"
                                  value={formState.username}
                                  onChange={handleInputChange}
                                  required
                              />
                          </Form.Group>
                          <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                  type="email"
                                  name="email"
                                  value={formState.email}
                                  onChange={handleInputChange}
                                  required
                              />
                          </Form.Group>
                          <Form.Group className="mb-3">
                              <Form.Label>Contact Number</Form.Label>
                              <Form.Control
                                  type="text"
                                  name="phone_number"
                                  value={formState.phone_number}
                                  onChange={handleInputChange}
                                  required
                              />
                          </Form.Group>
                          <Form.Group className="mb-3">
                              <Form.Label>Gender</Form.Label>
                              <Form.Control
                                  type="text"
                                  name="sex"
                                  value={formState.sex}
                                  onChange={handleInputChange}
                                  required
                              />
                          </Form.Group>
                          <Button variant="success" type="submit">
                              Save Changes
                          </Button>
                          <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>
                              Cancel
                          </Button>
                      </Form>
                        )}
                      
                    </Card.Body>
                </Card>
            </Container>
        </BaseLayout>
    );
};

export default UserInfo;
