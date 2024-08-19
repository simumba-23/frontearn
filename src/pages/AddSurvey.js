import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button, Container, Card } from 'react-bootstrap';
import { createSurvey, displaySurveys } from '../useApi';
import useApi from '../useApi';
import BaseLayout from '../components/AdminBaseLayout';
import { Link, useParams } from 'react-router-dom';

const AddSurvey = () => {
  const [title, setTitle] = useState('');
  const [surveys, setSurveys] = useState([]);
  const { taskId } = useParams();
  const { createSurvey, displaySurveys } = useApi();


  const fetchSurveys = () => {
    displaySurveys().then(response => {
      setSurveys(response.data);
    }).catch(error => {
      console.error('Error fetching surveys:', error);
    });
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createSurvey({ title, task: taskId }).then(response => {
      setTitle('');
      fetchSurveys(); // Fetch surveys after adding a new one
      console.log('New survey added:', response.data);
    }).catch(error => {
      console.error('Error creating survey:', error);
    });
  };

  return (
    <BaseLayout>
      <Container>
        <h1>Add Survey</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="formTitle">
            <FormLabel>Title:</FormLabel>
            <FormControl
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" className='m-2'>Add Survey</Button>
        </Form>

        <h2 className='mt-4'>Surveys</h2>
        {surveys.map((survey) => (
          <Card key={survey.id} className='mt-2'>
            <Card.Header>Survey Details</Card.Header>
            <Card.Body>
              <Card.Title>{survey.title}</Card.Title>
              <Card.Text>Task ID: {survey.task}</Card.Text>
              <Button className='m-2' as={Link} to={`/surveys/${survey.id}/questions/add`}>
                Add Questions
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </BaseLayout>
  );
};

export default AddSurvey;
