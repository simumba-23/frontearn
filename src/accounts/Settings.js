import React, { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import BaseLayout from '../components/BaseLayout';
import useApi from '../useApi';
import TwoFactorAuth from './TwoFactorAuth';
export const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { changePassword } = useApi();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setError('New Password and Confirm Password do not match');
        setSuccess('');
        return;
      }
    try {
      const response = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
    }

      );
      setSuccess(response.data.message);
      setError('');
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <BaseLayout title="Account Security">
      <div>
        <Container>
          <Card className='border mb-5'>
            <Card.Header className='fw-bold' style={{ background: '#34c0eb' }}>Change Password & 2FA</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Label>Enter Old Password</Form.Label>
                <Form.Control
                  type='password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder='Old Password'
                />
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='New Password'
                />
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm Password'
                />
                <Button type='submit' style={{ background: '#34c0eb' }} className='mt-2'>Save Changes</Button>
                {success && <div className='text-success mt-2'>{success}</div>}
                {error && <div className='text-danger mt-2'>{error}</div>}
              </Form>
            </Card.Body>
          </Card>
          <Card className="border mb-5">
          <Card.Header className="fw-bold" style={{ background: '#34c0eb' }}>Two-Factor Authentication</Card.Header>
          <Card.Body>
            <TwoFactorAuth />
          </Card.Body>
        </Card>
        </Container>
      </div>
    </BaseLayout>
  );
};
