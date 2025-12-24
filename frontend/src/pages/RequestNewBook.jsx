import { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Navbar,
  Nav
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const RequestNewBook = () => {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: ""
  });

  const [loading, setLoading] = useState(false);

  // ---------------------------
  // LOAD STUDENT REQUESTS
  // ---------------------------
  const loadRequests = async () => {
    try {
      const res = await api.get(`/book-request/student/${user.id}`);
      setRequests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user?.id) loadRequests();
  }, [user]);

  // ---------------------------
  // SUBMIT NEW REQUEST
  // ---------------------------
  const handleSubmit = async () => {
    if (!form.title || !form.author || !form.category) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/book-request/create", {
        ...form,
        student_id: user.id
      });

      setShowModal(false);
      setForm({ title: "", author: "", category: "" });
      loadRequests();

    } catch (e) {
      console.error(e);
      alert("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Your request was reviewed carefully, but we’re unable to add this book at the moment.":
        return "danger";
      case "Thanks for sharing! We’ll consider your request and update you soon.":
        return "success";
      default:
        return "warning";
    }
  };

  return (
    <>
      {/* NAVBAR */}
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
        {/* HEADER */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h2>📖 Request New Book</h2>
            <p className="text-muted">
              Request books that are not currently available in the library
            </p>
          </Col>
          <Col className="text-end">
            <Button onClick={() => setShowModal(true)}>
              ➕ Request New Book
            </Button>
          </Col>
        </Row>

        {/* REQUEST LIST */}
        <Card>
          <Card.Header>
            <h5 className="mb-0">My Book Requests</h5>
          </Card.Header>

          <Card.Body className="p-0">
            {requests.length === 0 ? (
              <div className="p-4 text-center text-muted">
                No book requests submitted yet.
              </div>
            ) : (
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Request Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.title}</td>
                      <td>{req.author}</td>
                      <td>{req.category}</td>
                      <td>
                        {new Date(req.requestDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(req.status)}>
                          {req.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request New Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestNewBook;
