import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Container, Form, Button } from 'react-bootstrap';

const cookies = new Cookies();
const COOKIE_EXPIRY_DAYS = 365;

const CookieConsent = () => {
  const [consent, setConsent] = useState({ isChecked: false, given: false });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const cookieConsent = cookies.get('cookieConsent');
    if (cookieConsent) {
      setConsent(prevState => ({ ...prevState, given: true }));
    }
  }, []);

  const setCookie = (name, value, days) => {
    cookies.set(name, value, { path: '/', expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000) });
  };

  const handleCheckboxChange = (e) => {
    setConsent(prevState => ({ ...prevState, isChecked: e.target.checked }));
  };

  const handleSubmit = () => {
    if (consent.isChecked) {
      setCookie('cookieConsent', 'true', COOKIE_EXPIRY_DAYS);
      setConsent(prevState => ({ ...prevState, given: true }));
    } else {
      setShowAlert(true);
    }
  };

  if (consent.given) return null;

  return (
    <div aria-live="polite">
      {showAlert && (
        <div className="alert alert-warning" role="alert">
          Please accept cookies to proceed.
        </div>
      )}
      <Container>
        <p>We use cookies to enhance your experience. Please check the box to consent.</p>
        <Form>
          <Form.Check
            type="checkbox"
            label="I accept cookies"
            id="cookieConsent"
            checked={consent.isChecked}
            onChange={handleCheckboxChange}
            aria-labelledby="cookieConsentLabel"
          />
          <br />
          <Button onClick={handleSubmit} 
            style={{background:'#a8e5f0'}} 

          >Proceed</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CookieConsent;
