import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import useApi from '../useApi';

const TwoFactorAuth = () => {
  const [otpUrl, setOtpUrl] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const { generate2fa, verify2fa } = useApi();



  useEffect(() => {
    const fetchOtpUrl = async () => {
      try {
        const response = await generate2fa();
        setOtpUrl(response.data.otp_url);
      } catch (error) {
        console.error('Error fetching OTP URL', error);
      }
    };

    fetchOtpUrl();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await verify2fa( { otp_code: otpCode });
      if (response.data.status === 'success') {
        setMessage('2FA enabled successfully!');
        setVariant('success');
      } else {
        setMessage('Failed to enable 2FA');
        setVariant('danger');
      }
    } catch (error) {
      setMessage('Failed to enable 2FA');
      setVariant('danger');
    }
  };

  return (
    <Container>
      <h2>Enable Two-Factor Authentication</h2>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {otpUrl && (
            <>
              <p>Scan this QR code with your authenticator app:</p>
              <QRCodeCanvas value={otpUrl} />
            </>
          )}
          <Form onSubmit={handleVerify}>
            <Form.Group controlId="otpCode">
              <Form.Label>Enter the code from your authenticator app:</Form.Label>
              <Form.Control
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP Code"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-2">
              Verify and Enable 2FA
            </Button>
          </Form>
          {message && (
            <Alert variant={variant} className="mt-3">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TwoFactorAuth;
