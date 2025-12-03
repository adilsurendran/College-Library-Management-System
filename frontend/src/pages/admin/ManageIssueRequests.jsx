import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, ButtonGroup, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchAllRequest, updateReq } from '../../services/requestservice';

const ManageIssueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    // Mock data - replace with API call
    const fetchRequest = async()=>{
      try{
      const res = await fetchAllRequest();
      console.log("all requestttttttttttttttt",res);
      setRequests(res.data)
      }
      catch(e){
        console.log(e);
        
      }
    }
    fetchRequest();
  }, []);

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  // const handleStatusUpdate = async (requestId, newStatus) => {

  //   console.log(requestId,newStatus);
  //   try{
  //     const res = await updateReq(requestId,newStatus);
  //     console.log(res);
      
      
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
    
  //   // setRequests(prev => prev.map(request => 
  //   //   request.id === requestId 
  //   //     ? { 
  //   //         ...request, 
  //   //         status: newStatus,
  //   //         ...(newStatus === 'approved' && { issueDate: new Date().toISOString().split('T')[0] }),
  //   //         ...(reason && { rejectionReason: reason })
  //   //       }
  //   //     : request
  //   // ));
  // };
const handleStatusUpdate = async (requestId, newStatus) => {
  try {
    const res = await updateReq(requestId, newStatus);
    console.log("Updated:", res.data);

    // ✅ Re-fetch updated list
    const refreshed = await fetchAllRequest();
    setRequests(refreshed.data);

  } catch (e) {
    console.log(e);
  }
};

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-4">
          <Col>
            <h1>📝 Manage Issue Requests</h1>
            <p className="text-muted">Approve or reject book issue requests from students</p>
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
                    All Requests
                  </Button>
                  <Button
                    variant={filter === 'pending' ? 'warning' : 'outline-warning'}
                    onClick={() => setFilter('pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filter === 'approved' ? 'success' : 'outline-success'}
                    onClick={() => setFilter('approved')}
                  >
                    Approved
                  </Button>
                  <Button
                    variant={filter === 'rejected' ? 'danger' : 'outline-danger'}
                    onClick={() => setFilter('rejected')}
                  >
                    Rejected
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Requests Table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Issue Requests</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Book</th>
                      <th>Request Date</th>
                      <th>Due Date</th>
                      <th>Fine</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map(request => (
                      <tr key={request._id}>
                        <td>
                          <strong>{request.student_id.name}</strong>
                          <br />
                          <small className="text-muted">Department: {request.student_id.department}</small>
                        </td>
                        <td><td>{request.book_id?.title || "📕 Book Deleted"}</td>
                          <br />
                          <small className="text-muted">By: <td>{request.book_id?.author || "Unknown"}</td></small>
                        </td>
                        <td>{new Date(request.issueDate).toLocaleDateString()}</td>
                        <td>{new Date(request.returnDate).toLocaleDateString() || '-'}</td>
                        <td>{request.student_id.fine}</td>
                        <td>
                          <Badge bg={getStatusVariant(request.status)}>
                            {request.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td>
                          {request.status === 'pending' && (
                            <div className="btn-group">
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleStatusUpdate(request._id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                    handleStatusUpdate(request._id, 'rejected');
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          {request.status !== 'pending' && (
                            <small className="text-muted">No actions available</small>
                          )}
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

export default ManageIssueRequests;