import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Card,Spinner } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';
import BaseLayout from '../components/BaseLayout';
import InviteesList from './InviteeList';
import { Link } from 'react-router-dom'
import useApi from '../useApi';

function ReferralLink() {
    const [referralLink, setReferralLink] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { getReferralLinks } = useApi();

    useEffect(() => {
        const fetchReferralLink = async () => {
            try {
                const response = await getReferralLinks();
                setReferralLink(response.data.referral_link);
                setLoading(false);
            } catch (error) {
                setError('Error fetching referral link.');
                setLoading(false);
            }
        
        };

        fetchReferralLink();
    }, [getReferralLinks]);


    const shareOnSocialMedia = (platform) => {
        const url = encodeURIComponent(referralLink);
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Join+me+on+this+platform!`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=Join+me+on+this+platform!+${url}`;
                break;
            case 'tiktok':
                shareUrl = `https://www.tiktok.com/share?url=${url}`;
                break;
            case 'instagram':
                alert('Please copy the link and share it on Instagram.');
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
    };

    return (
        <BaseLayout title="Your Referral Link">
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col>
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Your Referral Link</Card.Title>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    referralLink && (
                                        <Card.Text className="mb-4">
                                            <Alert variant="success">
                                                <strong>{referralLink}</strong>
                                            </Alert>
                                        </Card.Text>
                                    )
                                )}
                                    <p>Share</p>

                                <div className="d-flex justify-content-around flex-wrap">
                                    <Button variant="primary" className="mb-2" onClick={() => shareOnSocialMedia('facebook')}>
                                        <FaFacebook className="me-2" /> Facebook
                                    </Button>
                                    <Button variant="info text-light" className="mb-2" onClick={() => shareOnSocialMedia('twitter')}>
                                        <FaTwitter className="me-2" /> Twitter
                                    </Button>
                                    <Button variant="success" className="mb-2" onClick={() => shareOnSocialMedia('whatsapp')}>
                                        <FaWhatsapp className="me-2" /> WhatsApp
                                    </Button>
                                    <Button variant="dark" className="mb-2" onClick={() => shareOnSocialMedia('tiktok')}>
                                        <FaTiktok className="me-2" /> TikTok
                                    </Button>
                                    <Button variant="warning" className="mb-2 text-light" style={{ background: "#8134AF" }} onClick={() => shareOnSocialMedia('instagram')}>
                                        <FaInstagram className="me-2" /> Instagram
                                    </Button>
                                    <Button as={Link} className="mb-2 text-light" to='/invitees'> Your Invitees </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>


            </Container>
        </BaseLayout>
    );
} 

export default ReferralLink;
