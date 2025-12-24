import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Badge, Alert, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getBooks } from '../services/bookService';


const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Mock data - replace with actual API call
//     const mockBooks = [
//       {
//         id: 1,
//         title: "Data Structures and Algorithms",
//         author: "Robert Sedgewick",
//         isbn: "978-0321573513",
//         category: "Computer Science",
//         available: true,
//         totalCopies: 5,
//         availableCopies: 3
//       },
//       {
//         id: 2,
//         title: "Introduction to Artificial Intelligence",
//         author: "Stuart Russell",
//         isbn: "978-0136042594",
//         category: "Computer Science",
//         available: false,
//         totalCopies: 3,
//         availableCopies: 0
//       },
//       {
//         id: 3,
//         title: "Database Management Systems",
//         author: "Raghu Ramakrishnan",
//         isbn: "978-0072465631",
//         category: "Computer Science",
//         available: true,
//         totalCopies: 4,
//         availableCopies: 2
//       },
//       {
//         id: 4,
//         title: "Computer Networks",
//         author: "Andrew S. Tanenbaum",
//         isbn: "978-0132126953",
//         category: "Computer Science",
//         available: true,
//         totalCopies: 6,
//         availableCopies: 4
//       },
//       {
//         id: 5,
//         title: "Operating System Concepts",
//         author: "Abraham Silberschatz",
//         isbn: "978-1118063330",
//         category: "Computer Science",
//         available: true,
//         totalCopies: 5,
//         availableCopies: 1
//       }
//     ];

//     setBooks(mockBooks);
//     setFilteredBooks(mockBooks);
//     setLoading(false);
//   }, []);
useEffect(() => {
  const loadBooks = async () => {
    try {
      const res = await getBooks();
      console.log(res);
      
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Failed to load books:", err);
    } finally {
      setLoading(false);
    }
  };

  loadBooks();
}, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    );
    
    setFilteredBooks(filtered);
  };

  const handleIssueRequest = (bookId) => {
    // Navigate to issue request page with book pre-selected
    window.location.href = `/issue-request?bookId=${bookId}`;
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Navigation Bar (same as dashboard) */}
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
              <LinkContainer to="/request-book">
                              <Nav.Link>Request Book</Nav.Link>
                            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col>
            <h1>📚 Browse Books</h1>
            <p className="text-muted">Explore our collection of books</p>
          </Col>
        </Row>

        {/* Search Section */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button variant="outline-secondary">
                🔍 Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={4}>
            <div className="d-grid">
              <Button 
                variant="primary" 
                onClick={() => window.location.href = '/issue-request'}
              >
                📝 Request New Book
              </Button>
            </div>
          </Col>
        </Row>

        {/* Books Grid */}
        <Row>
          {filteredBooks.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                No books found matching your search criteria.
              </Alert>
            </Col>
          ) : (
            filteredBooks.map(book => (
              <Col key={book._id} lg={4} md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {book.author}<br />
                      {/* <strong>ISBN:</strong> {book.isbn}<br /> */}
                      <strong>Category:</strong> {book.category}<br />
                      <strong>Available Copies:</strong> {book.availableCopies}/{book.totalCopies}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge bg={book.availableCopies>0 ? "success" : "danger"}>
                        {book.availableCopies>0 ? "Available" : "Not Available"}
                      </Badge>
                      <Button
                        variant={book.availableCopies>0 ? "primary" : "secondary"}
                        size="sm"
                        disabled={book.availableCopies <= 0}
                        onClick={() => handleIssueRequest(book._id)}
                      >
                        {book.availableCopies>0 ? "Request Issue" : "Unavailable"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default BooksPage;