import React, { useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaStarHalfAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function TestimonialPage() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  // Function to generate a random decimal rating with an interval of 0.5
  const generateRandomRating = () => {
    // Create an array with ratings from 4.5 to 5.0 with an interval of 0.1
    const ratings = Array.from({ length: 6 }, (_, i) =>
      (4.5 + i * 0.1).toFixed(1)
    );
  
    const rating = parseFloat(
      ratings[Math.floor(Math.random() * ratings.length)]
    );
  
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStars);
  
    return (
      <ul className="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li className="me-2">{rating.toFixed(1)}</li> {/* Display the rating number */}

        {Array.from({ length: fullStars }, (_, i) => (
          <li key={`full-${i}`}>
            <FaStar />
          </li>
        ))}
        {halfStars ? (
          <li key="half">
            <FaStarHalfAlt />
          </li>
        ) : null}
        {Array.from({ length: emptyStars }, (_, i) => (
          <li key={`empty-${i}`}>
            <FaStar style={{ opacity: 0.2 }} />
          </li>
        ))}
      </ul>
    );
  };
  const testimonials = [
    {
      name: "Anna Deynah",
      role: "UX Designer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
    },
    {
      name: "John Doe",
      role: "Web Developer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
      quote:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
    },
    {
      name: "Maria Kate",
      role: "Photographer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
      quote:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    },
    // Add 7 more testimonials here
    {
      name: "David Smith",
      role: "Graphic Designer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.",
    },
    {
      name: "Lisa Ray",
      role: "Content Writer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp",
      quote:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
    {
      name: "Michael Brown",
      role: "SEO Specialist",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(13).webp",
      quote:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    },
    {
      name: "Emily Clark",
      role: "Marketing Manager",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(14).webp",
      quote:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    },
    {
      name: "Chris Evans",
      role: "Software Engineer",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp",
      quote:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    },
    {
      name: "Jessica Alba",
      role: "Project Manager",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(16).webp",
      quote:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    },
    {
      name: "Robert Downey",
      role: "IT Consultant",
      image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp",
      quote:
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    },
  ];

  return (
    <Container>
      <div className="text-center my-5">
        <div >
        <h4 className="fw-normal fs-4 fst-italic">What Our Users Say or User Experiences</h4>
        <h6 className="fw-normal fs-6 fst-italic">Hear From Our Community About Journey With us</h6>
        </div>
      
        <div className="d-flex justify-content-center align-items-center">
          <p
            variant="outline-secondary"
            className="me-2 justify-content-center"
            onClick={() =>
              handleSelect(
                (carouselIndex - 1 + testimonials.length) % testimonials.length
              )
            } // Wrap around on previous
          >
            <FaChevronLeft />
          </p>

          <Carousel
            variant="dark"
            controls={false}
            indicators={false}
            activeIndex={carouselIndex}
            onSelect={handleSelect}
            className="w-100 mt-3"
            interval={2500}
          >
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <img
                        className="rounded-circle shadow-1-strong mb-4"
                        src={testimonial.image}
                        alt="avatar"
                        style={{ width: "150px" }}
                      />
                      <h5 className="mb-3">{testimonial.name}</h5>
                      <p>{testimonial.role}</p>
                      <p className="text-muted">
                        <FaQuoteLeft className="pe-2" />
                        {testimonial.quote}
                        <FaQuoteRight className="ps-2" />
                      </p>
                      {generateRandomRating()}
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <p
            variant="outline-secondary"
            className="ms-2"
            onClick={() =>
              handleSelect((carouselIndex + 1) % testimonials.length)
            } // Wrap around on next
          >
            <FaChevronRight />
          </p>
        </div>
      </div>
    </Container>
  );
}

export default TestimonialPage;
