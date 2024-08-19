// SurveyList.js
import React, { useEffect, useState } from 'react';
import {Row,Col,Card,Container,Button} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import useApi from '../useApi';

import BaseLayout from '../components/BaseLayout';

const SurveyList = () => {
  const [survey, setSurveys] = useState('');
  const {taskId} = useParams()
 const { getSurveys } = useApi()


  useEffect(() => {
    getSurveys(taskId).then(response => {
      setSurveys(response.data);
    });
  }, []);

  return (
    <BaseLayout>
    <Container>
    <Row>
        <Col md={4} key={survey.id}>
          <Card>
            <Card.Body>
              <Card.Title>{survey.title}</Card.Title>
              <Button as={Link} to={`/surveys/${survey.id}/view`} variant="primary">View Survey</Button>
            </Card.Body>
          </Card>
        </Col>
    </Row>
  </Container>
    
    </BaseLayout>
    
  );
};

export default SurveyList;
