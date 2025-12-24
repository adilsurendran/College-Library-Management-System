import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Table, Badge, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { fetchallstats } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    pendingRequests: 0,
    issuedBooks: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with actual API calls
    const allstats = async (req,res)=>{
      try{
      const res = await fetchallstats();
      setStats(res.data.stats)
      }
      catch(e){
        console.log(e);
        
      }

    
      
    }

      allstats();
    // const mockStats = {
      // totalBooks: 156,
      // totalStudents: 89,
      // pendingRequests: 12,
      // issuedBooks: 45
    // };

    // const mockActivity = [
    //   { id: 1, student: 'John Doe', book: 'Data Structures', action: 'Requested', time: '2 hours ago' },
    //   { id: 2, student: 'Jane Smith', book: 'AI Fundamentals', action: 'Returned', time: '4 hours ago' },
    //   { id: 3, student: 'Mike Johnson', book: 'Database Systems', action: 'Issued', time: '1 day ago' },
    //   { id: 4, student: 'Sarah Wilson', book: 'Computer Networks', action: 'Requested', time: '1 day ago' }
    // ];

    // setStats(mockStats);
    // setRecentActivity(mockActivity);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getActionVariant = (action) => {
    switch (action.toLowerCase()) {
      case 'requested': return 'warning';
      case 'issued': return 'success';
      case 'returned': return 'info';
      default: return 'secondary';
    }
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
              <LinkContainer to="/admin/newbook">
                <Nav.Link>View Book Request</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                Signed in as: <strong>Admin</strong>
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
              <h2>Welcome, Admin! 👋</h2>
              <p className="mb-0">Manage your library system efficiently</p>
            </div>
          </Col>
        </Row>

        {/* Quick Stats */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>📚 Total Books</Card.Title>
                <h2 className="text-primary">{stats.totalBooks}</h2>
                <Card.Text>In library collection</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>👥 Total Students</Card.Title>
                <h2 className="text-info">{stats.totalStudents}</h2>
                <Card.Text>Registered students</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>⏳ Pending Requests</Card.Title>
                <h2 className="text-warning">{stats.pendingRequests}</h2>
                <Card.Text>Awaiting approval</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center h-100">
              <Card.Body>
                <Card.Title>✅ Issued Books</Card.Title>
                <h2 className="text-success">{stats.issuedBooks}</h2>
                <Card.Text>Currently issued</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>➕ Add New Book</Card.Title>
                <Card.Text>
                  Add a new book to the library collection
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/admin/books')}
                  className="w-100"
                >
                  Manage Books
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>📝 Manage Requests</Card.Title>
                <Card.Text>
                  Approve or reject book issue requests
                </Card.Text>
                <Button 
                  variant="warning" 
                  onClick={() => navigate('/admin/issue-requests')}
                  className="w-100"
                >
                  View Requests
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="h-100 text-center">
              <Card.Body>
                <Card.Title>👥 Student Management</Card.Title>
                <Card.Text>
                  View and manage student accounts
                </Card.Text>
                <Button 
                  variant="info" 
                  onClick={() => navigate('/admin/students')}
                  className="w-100"
                >
                  View Students
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        {/* <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">📋 Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Book</th>
                      <th>Action</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map(activity => (
                      <tr key={activity.id}>
                        <td>{activity.student}</td>
                        <td>{activity.book}</td>
                        <td>
                          <Badge bg={getActionVariant(activity.action)}>
                            {activity.action}
                          </Badge>
                        </td>
                        <td>{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default AdminDashboard;