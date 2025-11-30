

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Alert, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { addBook, deleteBook, getBooks, updateBook } from '../../services/bookService';
// import { getBooks, addBook, updateBook, deleteBook } from "../services/bookService";


const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");



  // Book categories
  const bookCategories = [
    'Computer Science',
    'Information Technology',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Literature',
    'History',
    'Philosophy',
    'Psychology',
    'Economics',
    'Business Management',
    'Medicine',
    'Law',
    'Art & Design',
    'Architecture',
    'Fiction',
    'Non-Fiction',
    'Biography',
    'Self-Help',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Thriller',
    'Horror',
    'Children Books',
    'Young Adult',
    'Reference',
    'Textbook',
    'Research Papers',
    'Other'
  ];

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    totalCopies: 1,
    availableCopies: 1,
  });


useEffect(() => {
  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to load books:", err);
    }
  };

  loadBooks();
}, []);


  const handleShowModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        category: '',
        totalCopies: 1,
        availableCopies: 1,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingBook) {
      // Update book
      await updateBook(editingBook._id, formData);
      setAlert({ show: true, type: "success", message: "Book updated successfully!" });
    } else {
      // Add new book
      await addBook(formData);
      setAlert({ show: true, type: "success", message: "Book added successfully!" });
    }

    handleCloseModal();

    // Refresh list
    const res = await getBooks();
    setBooks(res.data);

  } catch (err) {
    console.error(err);
    setAlert({ show: true, type: "danger", message: "Operation failed" });
  }

  setTimeout(() => setAlert({ show: false }), 3000);
};

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(bookId);

        setAlert({ show: true, type: "danger", message: "Book deleted!" });

        const res = await getBooks();
        setBooks(res.data);

      setAlert({ show: true, type: 'danger', message: 'Book deleted successfully!' });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    }
  };

const filteredBooks = books.filter(book => {
  
  // Category filter
  const matchesCategory = filterCategory
    ? book.category === filterCategory
    : true;

  // Search filter (name or author)
  const matchesSearch = searchTerm
    ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    : true;

  return matchesCategory && matchesSearch;
});



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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1>📚 Manage Books</h1>
                <p className="text-muted">Add, edit, and manage library books</p>
              </div>
              <Button variant="primary" onClick={() => handleShowModal()}>
                ➕ Add New Book
              </Button>
            </div>
          </Col>
        </Row>

        {alert.show && (
          <Alert variant={alert.type} className="mb-4">
            {alert.message}
          </Alert>
        )}

        {/* Category Filter */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Filter by Category</Form.Label>
              <Form.Select 
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
>
  <option value="">All Categories</option>
  {bookCategories.map(category => (
    <option key={category} value={category}>{category}</option>
  ))}
</Form.Select>

            </Form.Group>
          </Col>

          <Col md={4}>
    <Form.Group>
      <Form.Label>Search (Name / Author)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form.Group>
  </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Book Collection</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      {/* <th>ISBN</th> */}
                      <th>Category</th>
                      <th>Copies</th>
                      <th>Available</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map(book => (
                      <tr key={book.id}>
                        <td>
                          <strong>{book.title}</strong>
                          {/* {book.description && (<>
                            <br />
                            <small className="text-muted">{book.description}</small></>
                          )} */}
                        </td>
                        <td>{book.author}</td>
                        {/* <td>{book.isbn}</td> */}
                        <td>
                          <Badge bg="secondary">{book.category}</Badge>
                        </td>
                        <td>{book.totalCopies}</td>
                        <td>{book.availableCopies}</td>
                        <td>
                          <Badge bg={book.availableCopies > 0 ? 'success' : 'danger'}>
                            {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowModal(book)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(book._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Add/Edit Book Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Book Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter book title"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Author *</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter author name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {bookCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Copies *</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalCopies"
                      value={formData.totalCopies}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available Copies *</Form.Label>
                    <Form.Control
                      type="number"
                      name="availableCopies"
                      value={formData.availableCopies}
                      onChange={handleInputChange}
                      min="0"
                      max={formData.totalCopies}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingBook ? 'Update Book' : 'Add Book'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default ManageBooks;