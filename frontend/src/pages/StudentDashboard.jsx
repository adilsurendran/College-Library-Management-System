import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { allstats } from '../services/studentService';

const StudentDashboard = () => {
//   const [student, setStudent] = useState(null);

const { user } = useContext(AuthContext);
// console.log(user.id);


  const [stats, setStats] = useState({
    booksIssued: 0,
    pendingRequests: 0,
    booksRead: 0
  });
  const navigate = useNavigate();

  // useEffect(() => {

  //   const stats = async (req,res)=>{
  //     try{
  //     const res = await allstats(user.id)
  //     console.log(res);
      
  //     }
  //     catch(e){
  //       console.log(e);
        
  //     }
  //   }
  //   stats();
    
  //   const mockStats = {
  //     // booksIssued: 3,
  //     // pendingRequests: 1,
  //     // booksRead: 12
  //   };
    
  //   // setStudent(mockStudent);
  //   setStats(mockStats);
  // }, []);

  useEffect(() => {
  if (!user || !user.id) return;

  const loadStats = async () => {
    try {
      const res = await allstats(user.id); // CALL API
      console.log("Stats response:", res.data);

      setStats(res.data.stats); // SET STATS STATE
    } catch (e) {
      console.log("Stats load error:", e);
    }
  };

  loadStats();
}, [user]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

//   if (!student) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }
  if (!user) return <div>Loading...</div>;


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
              <LinkContainer to="/request-book">
                              <Nav.Link>Request Book</Nav.Link>
                            </LinkContainer>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                Signed in as: <strong>{user.name}</strong>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col>
            <div className="bg-primary text-white p-4 rounded">
              <h2>Welcome back, {user.name}! 👋</h2>
              <p className="mb-0">Department: {user.department}</p>
            </div>
          </Col>
        </Row>

        {/* Quick Stats */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>📖 Books Issued</Card.Title>
                <h2 className="text-primary">{stats.booksIssued}</h2>
                <Card.Text>Currently with you</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>⏳ Pending Requests</Card.Title>
                <h2 className="text-warning">{stats.pendingRequests}</h2>
                <Card.Text>Awaiting approval</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>✅ Books Read</Card.Title>
                <h2 className="text-success">{stats.booksRead}</h2>
                <Card.Text>Total books read</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row>
          <Col md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>🔍 Browse Books</Card.Title>
                <Card.Text>
                  Explore our extensive collection of books. Search by title, author, or category.
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/books')}
                  className="w-100"
                >
                  View All Books
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="h-100">
              <Card.Body className="text-center">
                <Card.Title>📝 Issue Request</Card.Title>
                <Card.Text>
                  Request to issue a new book from the library collection.
                </Card.Text>
                <Button 
                  variant="success" 
                  onClick={() => navigate('/issue-request')}
                  className="w-100"
                >
                  Request Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        {/* <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">📋 Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Data Structures and Algorithms</strong>
                      <br />
                      <small className="text-muted">Issued on: 2024-01-10 | Due: 2024-01-24</small>
                    </div>
                    <Badge bg="success">Active</Badge>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Introduction to AI</strong>
                      <br />
                      <small className="text-muted">Requested on: 2024-01-12</small>
                    </div>
                    <Badge bg="warning">Pending</Badge>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Database Management Systems</strong>
                      <br />
                      <small className="text-muted">Returned on: 2024-01-08</small>
                    </div>
                    <Badge bg="secondary">Returned</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default StudentDashboard;