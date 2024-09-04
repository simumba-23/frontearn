import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button,Container } from 'react-bootstrap';
import axios from 'axios';
import '../css/testmonial.css'
import TestimonialSubmissionForm from './TestmonialForm';
const TestimonialPage = () => {
const [testimonials, setTestimonials] = useState([]);


    useEffect(() => {
        axios.get('/api/testimonials/')
            .then(response => {
                setTestimonials(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the testimonials!", error);
            });
    }, []);

    // if( !testimonials){
    //     return <Container>
    //         <div> No testmonial yet</div>
    //     </Container>
    // }

    return (
        <Container>
            <div className="testimonial-page">
            <header>
                <h1>What Our Users Say</h1>
                <p>Hear from our community about their journey with us.</p>
            </header>
        { testimonials && (
            <>
<section className="featured-testimonials">
                <Carousel>
                    {testimonials.map(testimonial => (
                        <Carousel.Item key={testimonial.id}>
                            <Card className="text-center">
                                <Card.Img variant="top" src={testimonial.profile_picture} alt={testimonial.name} />
                                <Card.Body>
                                    <Card.Title>{testimonial.name}</Card.Title>
                                    <Card.Text>{testimonial.testimonial_text}</Card.Text>
                                    <Button variant="primary">Read More</Button>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>

            <section className="all-testimonials">
                {/* <h2>All Testimonials</h2> */}

                <div className="testimonial-grid">
                    {testimonials.map(testimonial => (
                        <Card key={testimonial.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={testimonial.profile_picture} />
                            <Card.Body>
                                <Card.Title>{testimonial.name}</Card.Title>
                                <Card.Text>{testimonial.testimonial_text.substring(0, 100)}...</Card.Text>
                                <Button variant="primary">Read More</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>

            </>
        ) }
            
            <section className="submit-testimonial">
                <TestimonialSubmissionForm /> {/* Include the form here */}
            </section>
        </div>

        </Container>
        
    );
};

export default TestimonialPage;
