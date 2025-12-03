import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { Studenthistory } from '../services/studentService';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // all, issued, returned, pending

    const { user } = useContext(AuthContext);

//   useEffect(() => {
//     // Mock data - replace with actual API call
//     const mockHistory = [
//       {
//         id: 1,
//         bookTitle: "Data Structures and Algorithms",
//         author: "Robert Sedgewick",
//         issueDate: "2024-01-10",
//         dueDate: "2024-01-24",
//         returnDate: null,
//         status: "issued",
//         fine: 0
//       },
//       {
//         id: 2,
//         bookTitle: "Introduction to AI",
//         author: "Stuart Russell",
//         issueDate: "2024-01-12",
//         dueDate: "2024-01-26",
//         returnDate: null,
//         status: "pending",
//         fine: 0
//       },
//       {
//         id: 3,
//         bookTitle: "Database Management Systems",
//         author: "Raghu Ramakrishnan",
//         issueDate: "2023-12-20",
//         dueDate: "2024-01-03",
//         returnDate: "2024-01-08",
//         status: "returned",
//         fine: 50
//       },
//       {
//         id: 4,
//         bookTitle: "Computer Networks",
//         author: "Andrew S. Tanenbaum",
//         issueDate: "2023-12-01",
//         dueDate: "2023-12-15",
//         returnDate: "2023-12-14",
//         status: "returned",
//         fine: 0
//       }
//     ];

//     setHistory(mockHistory);

// const loadhistory = async()=>{
//   try{
//     const res = await Studenthistory(user.id)
//     console.log(res);
    
//   }
//   catch(e){
//     console.log(e);
    
//   }
// }

// loadhistory();
//   }, []);

useEffect(() => {
  if (!user || !user.id) return; // Wait until user is loaded

  const loadHistory = async () => {
    try {
      const res = await Studenthistory(user.id);
      console.log("History:", res.data);

      setHistory(res.data); // Set backend data
    } catch (e) {
      console.error("Failed to load history:", e);
    }
  };

  loadHistory();
}, [user]);


  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'issued': return 'success';
      case 'pending': return 'warning';
      case 'returned': return 'secondary';
      default: return 'primary';
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
        <Row className="mb-4">
          <Col>
            <h1>📋 My Library History</h1>
            <p className="text-muted">View your book issue history and status</p>
          </Col>
        </Row>

        {/* Filter Buttons */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <ButtonGroup>
                  <Button
                    variant={filter === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilter('all')}
                  >
                    All Records
                  </Button>
                  <Button
                    variant={filter === 'issued' ? 'success' : 'outline-success'}
                    onClick={() => setFilter('issued')}
                  >
                    Currently Issued
                  </Button>
                  <Button
                    variant={filter === 'pending' ? 'warning' : 'outline-warning'}
                    onClick={() => setFilter('pending')}
                  >
                    Pending Requests
                  </Button>
                  <Button
                    variant={filter === 'returned' ? 'secondary' : 'outline-secondary'}
                    onClick={() => setFilter('returned')}
                  >
                    Returned Books
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* History Table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Book Issue History</h5>
              </Card.Header>
              <Card.Body className="p-0">
                {filteredHistory.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted mb-0">No records found for the selected filter.</p>
                  </div>
                ) : (
                  <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Book Details</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        {/* <th>Fine</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHistory.map(record => (
                        <tr key={record.id}>
                          <td>
                            <div>
                              <strong>{record.book_id?.title || "📕 Book Deleted"}</strong>
                              <br />
                              <small className="text-muted">by {record.book_id?.author || "Unknown"}</small>
                            </div>
                          </td>
                          <td>{new Date(record.issueDate).toLocaleDateString()}</td>
                          <td>{new Date(record.returnDate).toLocaleDateString()}</td>
                          {/* <td>{record.actual_returnDate || '-'}</td> */}
                          <td>
  {record.actual_returnDate 
    ? new Date(record.actual_returnDate).toLocaleDateString()
    : "-"
  }
</td>
                          <td>
                            <Badge bg={getStatusVariant(record.status)}>
                              {record.status.toUpperCase()}
                            </Badge>
                          </td>
                          {/* <td>
                            <Badge bg={getFineVariant(record.fine)}>
                              ₹{record.student_id.fine}
                            </Badge>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="mt-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5>Total Books Issued</h5>
                <h3 className="text-primary">
                  {history.filter(h => h.status === 'issued' || h.status === 'returned').length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5>Pending Requests</h5>
                <h3 className="text-warning">
                  {history.filter(h => h.status === 'pending').length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <h5>Total Fine</h5>
                <h3 className="text-danger">
                  ₹{history?.[0]?.student_id?.fine ?? 0}
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HistoryPage;