import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, InputGroup, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { viewstudent } from '../../services/studentService';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

useEffect(()=>{
  const loadStudents = async () =>{
    try{
      const res = await viewstudent();
      console.log(res);
      
      setStudents(res.data)
    }
    catch(err){
      console.error("Failed to fetch Students");
      
    }
  }
  loadStudents();
},[])

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  const getFineVariant = (fine) => {
    return fine > 0 ? 'danger' : 'success';
  };

  const handleStatusToggle = (studentId) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    ));
  };

  // console.log(students);
  

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
            <h1>👥 View Students</h1>
            <p className="text-muted">Manage and view all registered students</p>
          </Col>
        </Row>

        {/* Search */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name, email, ID, or department..."
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
                <h6>Total Students</h6>
                <h4 className="text-primary">{students.length}</h4>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Active Students</h6>
                <h4 className="text-success">
                  {students.filter(s => s.status === 'active').length}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Books Issued</h6>
                <h4 className="text-info">
                  {students.reduce((sum, student) => sum + student.booksIssued, 0)}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h6>Total Fines</h6>
                <h4 className="text-danger">
                  ₹{students.reduce((sum, student) => sum + student.totalFine, 0)}
                </h4>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>

        {/* Students Table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Student Details</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th>Student ID</th> */}
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Registration Date</th>
                      <th>Reg Date</th>
                      {/* <th>Total Fine</th> */}
                      {/* <th>Status</th> */}
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.id}>
                        {/* <td>
                          <strong>{student.studentId}</strong>
                        </td> */}
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        {/* <td>{student.registrationDate}</td> */}<td>{new Date(student.regDate).toLocaleDateString()}</td>

                        <td>
                          {student?.regDate ? new Date(student.regDate).toISOString().split("T")[0] : ""}


                        </td>
                        {/* <td>
                          <Badge bg={getFineVariant(student.totalFine)}>
                            ₹{student.totalFine}
                          </Badge>
                        </td> */}
                        {/* <td>
                          <Badge bg={getStatusVariant(student.status)}>
                            {student.status.toUpperCase()}
                          </Badge>
                          <p>1</p>
                        </td> */}
                        {/* <td>
                          <Button
                            variant={student.status === 'active' ? 'outline-danger' : 'outline-success'}
                            size="sm"
                            onClick={() => handleStatusToggle(student.id)}
                          >
                            {student.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </td> */}
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

export default ViewStudents;