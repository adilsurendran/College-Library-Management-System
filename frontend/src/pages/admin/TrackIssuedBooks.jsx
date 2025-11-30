import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, InputGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const TrackIssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    const mockIssuedBooks = [
      {
        id: 1,
        studentName: 'John Doe',
        studentId: 'S001',
        bookTitle: 'Data Structures and Algorithms',
        issueDate: '2024-01-10',
        dueDate: '2024-01-24',
        returnDate: null,
        status: 'active',
        fine: 0,
        daysOverdue: 0
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        studentId: 'S002',
        bookTitle: 'Introduction to AI',
        issueDate: '2024-01-05',
        dueDate: '2024-01-19',
        returnDate: null,
        status: 'overdue',
        fine: 50,
        daysOverdue: 5
      },
      {
        id: 3,
        studentName: 'Mike Johnson',
        studentId: 'S003',
        bookTitle: 'Database Systems',
        issueDate: '2023-12-20',
        dueDate: '2024-01-03',
        returnDate: '2024-01-08',
        status: 'returned',
        fine: 50,
        daysOverdue: 5
      }
    ];
    setIssuedBooks(mockIssuedBooks);
  }, []);

  const filteredBooks = issuedBooks.filter(book =>
    book.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'overdue': return 'danger';
      case 'returned': return 'info';
      default: return 'secondary';
    }
  };

  const getFineVariant = (fine) => {
    return fine > 0 ? 'danger' : 'success';
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>👨‍💼 Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/admin">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/books">
                <Nav.Link>Manage Books</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/issue-requests">
                <Nav.Link>Issue Requests</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/track-books">
                <Nav.Link>Track Books</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/students">
                <Nav.Link>View Students</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col>
            <h1>📊 Track Issued Books</h1>
            <p className="text-muted">Monitor currently issued books and track overdue items</p>
          </Col>
        </Row>

        {/* Search */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by student name, ID, or book title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Total Issued</h6>
                <h4 className="text-primary">
                  {issuedBooks.filter(b => b.status !== 'returned').length}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Overdue</h6>
                <h4 className="text-danger">
                  {issuedBooks.filter(b => b.status === 'overdue').length}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Total Fine</h6>
                <h4 className="text-warning">
                  ₹{issuedBooks.reduce((sum, book) => sum + book.fine, 0)}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Returned</h6>
                <h4 className="text-success">
                  {issuedBooks.filter(b => b.status === 'returned').length}
                </h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Issued Books Table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Issued Books Details</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Book</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Return Date</th>
                      <th>Status</th>
                      <th>Days Overdue</th>
                      <th>Fine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map(book => (
                      <tr key={book.id}>
                        <td>
                          <strong>{book.studentName}</strong>
                          <br />
                          <small className="text-muted">ID: {book.studentId}</small>
                        </td>
                        <td>{book.bookTitle}</td>
                        <td>{book.issueDate}</td>
                        <td>{book.dueDate}</td>
                        <td>{book.returnDate || '-'}</td>
                        <td>
                          <Badge bg={getStatusVariant(book.status)}>
                            {book.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td>
                          {book.daysOverdue > 0 ? (
                            <Badge bg="danger">{book.daysOverdue} days</Badge>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          <Badge bg={getFineVariant(book.fine)}>
                            ₹{book.fine}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TrackIssuedBooks;