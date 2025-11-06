import React, { useEffect, useState } from 'react';
import { Card, Container, Button, Form, Table } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';
import { FaEdit, FaPhoneAlt, FaMale, FaFemale } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import useApi from '../useApi';
import userProfile from '../Assets/userProfile.jpg';

const UserInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    phone_number: '',
    sex: '',
    payment_method: '',
  });
  const { getProfileData, updateProfileData } = useApi();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfileData();
        setProfileData(response.data);
        console.log('data:', response.data);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchProfileData();
  }, [getProfileData]);

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
      payment_method: profileData.payment_method,
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
    return (
      <BaseLayout title="Profile Details">
        <div>Loading...</div>
      </BaseLayout>
    );
  }

  const profileImage = profileData.profile_image || userProfile;

  return (
    <BaseLayout title="Profile Details">
      <Container>
        <Card className="border mb-5">
          <Card.Header className="fw-bold" style={{ background: '#34c0eb' }}>
            Profile Information
          </Card.Header>
          <Card.Body>
            <Card.Img
              variant="top"
              src={profileImage}
              alt="Profile"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            {/* <Card.Text> {profileData.}</Card.Text> */}

            {!isEditing ? (
              <>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th colSpan="2">Personal Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{profileData.username}</td>
                    </tr>
                    <tr>
                      <td>Full Name</td>
                      <td>{profileData.first_name}  {profileData.last_name}</td>
                    </tr>
                    <tr>
                      <td>Withdraw Method</td>
                      <td>{profileData.phone_number}</td>
                    </tr>
                    <tr>
                      <td>Physical Adress</td>
                      <td>Tanzania</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{profileData.sex === 'Male' ? <FaMale /> : <FaFemale />} {profileData.sex}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="2">Contact Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td><MdOutlineMail /> {profileData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td><FaPhoneAlt /> {profileData.phone_number}</td>
                    </tr>
                  </tbody>
                  {/*  */}
                </Table>
                <Button variant="primary" onClick={handleEditClick}>
                  <FaEdit className="me-2" /> Edit Profile
                </Button>
              </>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th colSpan="2">Personal Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formState.username}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>
                        <Form.Control
                          type="text"
                          name="sex"
                          value={formState.sex}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="2">Contact Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={formState.phone_number}
                          onChange={handleInputChange}
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                  
                </Table>
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
