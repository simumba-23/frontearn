import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useApi from '../useApi';
import BaseLayout from '../components/BaseLayout';

const SurveyList = () => {
  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState(null);
  const { taskId } = useParams();
  const { getSurveys } = useApi();

  useEffect(() => {
    getSurveys(taskId)
      .then(response => {
        setSurvey(response.data);
        setError(null); // clear any previous errors
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Survey not found');
        } else {
          setError('An error occurred while fetching the survey');
        }
        setSurvey(null); // clear any previous survey data
      });
  }, [taskId,getSurveys]);

  return (
    <BaseLayout>
      <Container>
        <Row>
          <Col md={4}>
            {error ? (
              <p>{error}</p>
            ) : survey ? (
              <Card>
                <Card.Body>
                  <Card.Title>{survey.title}</Card.Title>
                  <Button as={Link} to={`/surveys/${survey.id}/view`} variant="primary">
                    Dive Into Survey
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default SurveyList;
