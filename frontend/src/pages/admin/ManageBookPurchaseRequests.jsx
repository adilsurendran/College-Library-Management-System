import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  ButtonGroup,
  Navbar,
  Nav
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import api from "../../services/api";

const ManageBookPurchaseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // LOAD ALL BOOK REQUESTS
  // ----------------------------
  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/book-request/all");
      setRequests(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load book requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // ----------------------------
  // UPDATE STATUS
  // ----------------------------
  const updateStatus = async (requestId, status) => {
    try {
      await api.patch(`/book-request/status/${requestId}`, { status });
      loadRequests();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  // ----------------------------
  // FILTER
  // ----------------------------
  const filteredRequests = requests.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Thanks for sharing! We’ll consider your request and update you soon.":
        return "success";
      case "Your request was reviewed carefully, but we’re unable to add this book at the moment.":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>👨‍💼 Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
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
              <LinkContainer to="/admin/book-requests">
                <Nav.Link>Book Requests</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* HEADER */}
        <Row className="mb-3">
          <Col>
            <h2>📘 New Book Purchase Requests</h2>
            <p className="text-muted">
              Review and approve student book purchase requests
            </p>
          </Col>
        </Row>

        {/* FILTER BUTTONS */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <ButtonGroup>
                  <Button
                    variant={filter === "all" ? "primary" : "outline-primary"}
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "pending" ? "warning" : "outline-warning"}
                    onClick={() => setFilter("pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filter === "Thanks for sharing! We’ll consider your request and update you soon." ? "success" : "outline-success"}
                    onClick={() => setFilter("Thanks for sharing! We’ll consider your request and update you soon.")}
                  >
                    Approved
                  </Button>
                  <Button
                    variant={filter === "Your request was reviewed carefully, but we’re unable to add this book at the moment." ? "danger" : "outline-danger"}
                    onClick={() => setFilter("Your request was reviewed carefully, but we’re unable to add this book at the moment.")}
                  >
                    Rejected
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* TABLE */}
        <Card>
          <Card.Header>
            <h5 className="mb-0">Requests List</h5>
          </Card.Header>

          <Card.Body className="p-0">
            {loading ? (
              <div className="p-4 text-center text-muted">Loading...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="p-4 text-center text-muted">
                No requests found.
              </div>
            ) : (
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Student</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req._id}>
                      <td>
                        <strong>{req.student_id?.name}</strong>
                        <br />
                        <small className="text-muted">
                          {req.student_id?.email}
                        </small>
                      </td>
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
                      <td>
                        {req.status === "pending" ? (
                          <div className="btn-group">
                            <Button
                              size="sm"
                              variant="outline-success"
                              onClick={() =>
                                updateStatus(req._id, "Thanks for sharing! We’ll consider your request and update you soon.")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() =>
                                updateStatus(req._id, "Your request was reviewed carefully, but we’re unable to add this book at the moment.")
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <small className="text-muted">No actions</small>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ManageBookPurchaseRequests;
