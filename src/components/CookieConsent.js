import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Container, Form, Button } from 'react-bootstrap';

const cookies = new Cookies();

const CookieConsent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent cookie already exists
    const cookieConsent = cookies.get('cookieConsent');
    if (cookieConsent) {
      setConsentGiven(true);
    }
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      cookies.set('cookieConsent', 'true', { path: '/', expires: new Date(Date.now() + 365*24*60*60*1000) }); // 1 year
      setConsentGiven(true);
    } else {
      alert('Please accept cookies to proceed.');
    }
  };

  if (consentGiven) return null;

  return (
    <div >
      <Container>
        <p>We use cookies to enhance your experience. Please check the box to consent.</p>
        <Form>
          <Form.Check
            type="checkbox"
            label="I accept cookies"
            id="cookieConsent"
            checked={isChecked}
            onChange={handleCheckboxChange}
            // style={{ color: '#ffffff' }}
          />
          <br />
          <Button onClick={handleSubmit} variant="primary">Proceed</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CookieConsent;
