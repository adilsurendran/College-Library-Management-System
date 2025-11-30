import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSearchParams } from 'react-router-dom';

const IssueRequestPage = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setIssueDate(today);
    setReturnDate(nextWeek);

    // Mock books data - replace with API call
    const mockBooks = [
      { id: 1, title: "Data Structures and Algorithms", author: "Robert Sedgewick" },
      { id: 2, title: "Introduction to Artificial Intelligence", author: "Stuart Russell" },
      { id: 3, title: "Database Management Systems", author: "Raghu Ramakrishnan" },
      { id: 4, title: "Computer Networks", author: "Andrew S. Tanenbaum" },
      { id: 5, title: "Operating System Concepts", author: "Abraham Silberschatz" }
    ];

    setBooks(mockBooks);

    // Pre-select book if bookId is in URL
    const bookId = searchParams.get('bookId');
    if (bookId) {
      setSelectedBook(bookId);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBook || !issueDate || !returnDate) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Mock API call - replace with actual API
    try {
      console.log('Submitting issue request:', {
        bookId: selectedBook,
        issueDate,
        returnDate,
        message
      });

      setAlert({
        show: true,
        type: 'success',
        message: 'Book issue request submitted successfully!'
      });

      // Reset form
      setSelectedBook('');
      setMessage('');
      
      setTimeout(() => {
        window.location.href = '/history';
      }, 2000);
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Failed to submit request. Please try again.'
      });
    }
  };

  const selectedBookInfo = books.find(book => book.id === parseInt(selectedBook));

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>📚 Student Library Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/books">
                <Nav.Link>Browse Books</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/issue-request">
                <Nav.Link>Issue Book</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/history">
                <Nav.Link>My History</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">📝 Book Issue Request</h4>
              </Card.Header>
              <Card.Body>
                {alert.show && (
                  <Alert variant={alert.type} dismissible onClose={() => setAlert({ ...alert, show: false })}>
                    {alert.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Book *</Form.Label>
                    <Form.Select 
                      value={selectedBook} 
                      onChange={(e) => setSelectedBook(e.target.value)}
                      required
                    >
                      <option value="">Choose a book...</option>
                      {books.map(book => (
                        <option key={book.id} value={book.id}>
                          {book.title} - {book.author}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {selectedBookInfo && (
                    <Alert variant="info">
                      <strong>Selected Book:</strong> {selectedBookInfo.title}<br />
                      <strong>Author:</strong> {selectedBookInfo.author}
                    </Alert>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Issue Date *</Form.Label>
                        <Form.Control
                          type="date"
                          value={issueDate}
                          onChange={(e) => setIssueDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Expected Return Date *</Form.Label>
                        <Form.Control
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={issueDate}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Additional Message (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Any special requests or messages..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                      📨 Submit Issue Request
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => window.location.href = '/books'}
                    >
                      🔍 Browse More Books
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Instructions */}
            <Card className="mt-4">
              <Card.Header>
                <h6 className="mb-0">ℹ️ Instructions</h6>
              </Card.Header>
              <Card.Body>
                <ul className="mb-0">
                  <li>Select the book you want to issue from the dropdown</li>
                  <li>Choose the issue date and expected return date</li>
                  <li>You can add an optional message for the librarian</li>
                  <li>Submit the request for approval</li>
                  <li>You will be notified once your request is processed</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IssueRequestPage;