import { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getBooks } from "../services/bookService";
import api from "../services/api";
import { newRequest } from "../services/requestservice";

const IssueRequestPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",user);
  

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  // const [returnDate, setReturnDate] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const bookId = searchParams.get("bookId");

  // -------------------------------
  // Load Books + Preselect Book ID
  // -------------------------------
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await getBooks();
        console.log("booksssssssssss",res);
        
        setBooks(res.data);

        // Pre-select the book
        if (bookId) {
          setSelectedBook(bookId);
        }
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    };

    loadBooks();
  }, [bookId]);

  // -------------------------------
  // Set Default Issue + Return Dates
  // -------------------------------
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    // const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    //   .toISOString()
    //   .split("T")[0];

    setIssueDate(today);
    // setReturnDate(nextWeek);
  }, []);

  // -------------------------------
  // Submit Issue Request
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBook || !issueDate ) {
      return setAlert({
        show: true,
        type: "danger",
        message: "Please fill in all required fields.",
      });
    }

    try {
      const student_id = user.id || user._id;
      console.log("student iddddddddddddddddddddddddddd",student_id);
      

      const res = await newRequest(selectedBook,issueDate,student_id)

      console.log(res);

      setAlert({
        show: true,
        type: "success",
        message: "Book issue request submitted successfully!",
      });

      // Reset
      setSelectedBook("");

      setTimeout(() => {
        window.location.href = "/history";
      }, 1500);
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: "danger",
        message: "Failed to submit request. Please try again.",
      });
    }
  };

  const selectedBookInfo = books.find((b) => b._id === selectedBook);

  return (
    <>
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>📚 Student Library Portal</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
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

      {/* Content */}
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">📝 Book Issue Request</h4>
              </Card.Header>

              <Card.Body>
                {alert.show && (
                  <Alert
                    variant={alert.type}
                    dismissible
                    onClose={() => setAlert({ ...alert, show: false })}
                  >
                    {alert.message}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {/* Select Book */}
                  <Form.Group className="mb-3">
                    <Form.Label>Select Book *</Form.Label>
                    <Form.Select
                      value={selectedBook}
                      onChange={(e) => setSelectedBook(e.target.value)}
                      required
                    >
                      <option value="">Choose a book...</option>
                      {books.map((book) => (
                        <option key={book._id} value={book._id}>
                          {book.title} — {book.author}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {/* Selected Book Info */}
                  {selectedBookInfo && (
                    <Alert variant="info">
                      <strong>Selected Book:</strong> {selectedBookInfo.title}
                      <br />
                      <strong>Author:</strong> {selectedBookInfo.author}
                    </Alert>
                  )}

                  {/* Dates */}
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

                   
                  </Row>

                  {/* Submit */}
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg">
                      📨 Submit Issue Request
                    </Button>

                    <Button
                      variant="outline-secondary"
                      onClick={() => (window.location.href = "/books")}
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
                <ul>
                  <li>Select the book you want to issue.</li>
                  <li>Choose the issue and expected return date.</li>
                  <li>Submit the request for librarian approval.</li>
                  <li>You can track it in your history.</li>
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
