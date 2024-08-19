import React, { useState, useEffect } from 'react';
import useApi from '../useApi';
import { Form, FormGroup, FormLabel, FormControl, Button, Container, ListGroup, Card } from 'react-bootstrap';
import BaseLayout from '../components/AdminBaseLayout';
import { useParams } from 'react-router-dom';

const QuestionDetails = () => {
  const [options, setOptions] = useState([]);
  const [text, setText] = useState('');
  const { questionId } = useParams();
  const { getAnswerOptions, createAnswerOption } = useApi()


  useEffect(() => {
    // Fetch answer options when the component mounts
    getAnswerOptions(questionId)
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching answer options:', error);
      });
  }, [questionId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new answer option
    createAnswerOption({ question: questionId, text })
      .then(response => {
        setOptions(prevOptions => [...prevOptions, response.data]);
        setText('');
      })
      .catch(error => {
        console.error('Error creating answer option:', error);
      });
  };

  return (
    <BaseLayout>
      <Container>
        <h1>Answer Options</h1>
        <Card>
          <Card.Body>
            <ListGroup>
              {options.map(option => (
                <ListGroup.Item key={option.id}>
                  {option.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <h2 className="mt-4">Add Answer Option</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="formOptionText">
            <FormLabel>Option Text:</FormLabel>
            <FormControl
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" className='m-2'>Submit</Button>
        </Form>
      </Container>
    </BaseLayout>
  );
};

export default QuestionDetails;
