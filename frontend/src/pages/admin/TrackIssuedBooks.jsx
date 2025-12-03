// import { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Table, Badge, Navbar, Nav, InputGroup, Form, Modal, Button} from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { fetchAllRequest } from '../../services/requestservice';

// const TrackIssuedBooks = () => {
//   const [issuedBooks, setIssuedBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');


//   const [showModal, setShowModal] = useState(false);
// const [selectedRequest, setSelectedRequest] = useState(null);
// const [returnDateInput, setReturnDateInput] = useState("");
// const [fineInput, setFineInput] = useState("");
// const [needsFine, setNeedsFine] = useState(false);


// const handleReturnClick = (book) => {
//   setSelectedRequest(book);
//   setReturnDateInput(""); 
//   setFineInput("");
//   setShowModal(true);
// };

// const handleReturnSubmit = async () => {
//   const today = new Date(returnDateInput);
//   const due = new Date(selectedRequest.returnDate);

//   let fine = 0;

//   if (today > due) {
//     // Late → Manual fine required
//     if (!fineInput) {
//       alert("Please enter fine amount");
//       return;
//     }
//     fine = Number(fineInput);
//   }

//   try {
//     await returnBook(selectedRequest._id, {
//       returnDate: returnDateInput,
//       fine,
//     });

//     // Refresh list
//     const res = await fetchIssuedBooks();
//     setIssuedBooks(res.data);

//     setShowModal(false);
//   } catch (e) {
//     console.log(e);
//     alert("Error returning book");
//   }
// };



//   useEffect(() => {
//     // Mock data - replace with API call
   
// const allreq = async(req,res)=>{
//   try{
//     const res = await fetchAllRequest()
//     console.log(res);
//     setIssuedBooks(res.data)
    
//     }
//     catch(e){
//       console.log(e);
//     }
//     }
//     allreq();
//   }, []);

//   const filteredBooks = issuedBooks.filter(book =>
//     book.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.studentId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case 'active': return 'success';
//       case 'overdue': return 'danger';
//       case 'returned': return 'info';
//       default: return 'secondary';
//     }
//   };

//   const getFineVariant = (fine) => {
//     return fine > 0 ? 'danger' : 'success';
//   };

//   return (
//     <>
//       {/* Navigation Bar */}
//       <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
//         <Container>
//           <Navbar.Brand>👨‍💼 Admin Dashboard</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <LinkContainer to="/admin">
//                 <Nav.Link>Dashboard</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/admin/books">
//                 <Nav.Link>Manage Books</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/admin/issue-requests">
//                 <Nav.Link>Issue Requests</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/admin/track-books">
//                 <Nav.Link>Track Books</Nav.Link>
//               </LinkContainer>
//               <LinkContainer to="/admin/students">
//                 <Nav.Link>View Students</Nav.Link>
//               </LinkContainer>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container>
//         <Row className="mb-4">
//           <Col>
//             <h1>📊 Track Issued Books</h1>
//             <p className="text-muted">Monitor currently issued books and track overdue items</p>
//           </Col>
//         </Row>

//         {/* Search */}
//         <Row className="mb-4">
//           <Col md={6}>
//             <InputGroup>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by student name, ID, or book title..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Statistics */}
//         <Row className="mb-4">
//           <Col md={3}>
//             <Card className="text-center">
//               <Card.Body>
//                 <h6>Total Issued</h6>
//                 <h4 className="text-primary">
//                   {issuedBooks.filter(b => b.status !== 'returned').length}
//                 </h4>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={3}>
//             <Card className="text-center">
//               <Card.Body>
//                 <h6>Overdue</h6>
//                 <h4 className="text-danger">
//                   {issuedBooks.filter(b => b.status === 'overdue').length}
//                 </h4>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={3}>
//             <Card className="text-center">
//               <Card.Body>
//                 <h6>Total Fine</h6>
//                 <h4 className="text-warning">
//                   ₹{issuedBooks.reduce((sum, book) => sum + book.fine, 0)}
//                 </h4>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={3}>
//             <Card className="text-center">
//               <Card.Body>
//                 <h6>Returned</h6>
//                 <h4 className="text-success">
//                   {issuedBooks.filter(b => b.status === 'returned').length}
//                 </h4>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Issued Books Table */}
//         <Row>
//           <Col>
//             <Card>
//               <Card.Header>
//                 <h5 className="mb-0">Issued Books Details</h5>
//               </Card.Header>
//               <Card.Body>
//                 <Table responsive hover>
//                   <thead>
//                     <tr>
//                       <th>Student</th>
//                       <th>Book</th>
//                       <th>Issue Date</th>
//                       <th>Due Date</th>
//                       <th>Return Date</th>
//                       <th>Status</th>
//                       <th>Days Overdue</th>
//                       <th>Fine</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredBooks.map(book => (
//                       <tr key={book.id}>
//                         <td>
//                           <strong>{book.studentName}</strong>
//                           <br />
//                           <small className="text-muted">ID: {book.studentId}</small>
//                         </td>
//                         <td>{book.bookTitle}</td>
//                         <td>{book.issueDate}</td>
//                         <td>{book.dueDate}</td>
//                         <td>{book.returnDate || '-'}</td>
//                         <td>
//                           <Badge bg={getStatusVariant(book.status)}>
//                             {book.status.toUpperCase()}
//                           </Badge>
//                         </td>
//                         <td>
//                           {book.daysOverdue > 0 ? (
//                             <Badge bg="danger">{book.daysOverdue} days</Badge>
//                           ) : (
//                             '-'
//                           )}
//                         </td>
//                         <td>
//                           <Badge bg={getFineVariant(book.fine)}>
//                             ₹{book.fine}
//                           </Badge>
//                         </td>

//                         <td>
//   {book.status === "approved" ? (
//     <Button
//       variant="outline-primary"
//       size="sm"
//       onClick={() => handleReturnClick(book)}
//     >
//       Return Book
//     </Button>
//   ) : (
//     <small className="text-muted">No actions</small>
//   )}
// </td>

//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>


//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Return Book</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>

//     {/* Return Date */}
//     <Form.Group className="mb-3">
//       <Form.Label>Select Return Date</Form.Label>
//       <Form.Control
//         type="date"
//         value={returnDateInput}
//         onChange={(e) => setReturnDateInput(e.target.value)}
//       />
//     </Form.Group>

//     {/* Show Fine field ONLY if late */}
//     {returnDateInput && 
//       new Date(returnDateInput) > new Date(selectedRequest?.returnDate) && (
//         <Form.Group className="mb-3">
//           <Form.Label>Fine Amount (Late Return)</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter fine"
//             value={fineInput}
//             onChange={(e) => setFineInput(e.target.value)}
//           />
//         </Form.Group>
//     )}

//   </Modal.Body>

//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//     <Button variant="primary" onClick={handleReturnSubmit}>
//       Confirm Return
//     </Button>
//   </Modal.Footer>
// </Modal>

//       </Container>
//     </>
//   );
// };

// export default TrackIssuedBooks;



import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Navbar,
  Nav,
  InputGroup,
  Form,
  Modal,
  Button
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { fetchAllRequest, returnBook } from "../../services/requestservice";

const TrackIssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [returnDateInput, setReturnDateInput] = useState("");
  const [fineInput, setFineInput] = useState("");

  // Load issued/approved requests
  const loadData = async () => {
    try {
      const res = await fetchAllRequest();
      console.log("Fetched:", res.data);
      setIssuedBooks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter by student name, email, or book title
  const filteredBooks = issuedBooks.filter((book) => {
    const studentName = book.student_id?.name?.toLowerCase() || "";
    const studentEmail = book.student_id?.email?.toLowerCase() || "";
    const bookTitle = book.book_id?.title?.toLowerCase() || "";

    const search = searchTerm.toLowerCase();

    return (
      studentName.includes(search) ||
      studentEmail.includes(search) ||
      bookTitle.includes(search)
    );
  });

  // Badge coloring
  const getStatusVariant = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      case "pending":
        return "warning";
      case "returned":
        return "info";
      default:
        return "secondary";
    }
  };

  // Fine badge
  const getFineVariant = (fine) => {
    return fine > 0 ? "danger" : "success";
  };

  // Return Book clicked
  const handleReturnClick = (book) => {
    setSelectedRequest(book);
    setReturnDateInput("");
    setFineInput("");
    setShowModal(true);
  };

  // Submit return
  const handleReturnSubmit = async () => {
    if (!returnDateInput) {
      alert("Please select return date");
      return;
    }

    const selectedReturnDate = new Date(returnDateInput);
    const dueDate = new Date(selectedRequest.returnDate);

    let fine = 0;

    // If late → fine must be entered manually
    if (selectedReturnDate > dueDate) {
      if (!fineInput) {
        alert("Book is overdue! Enter fine amount.");
        return;
      }
      fine = Number(fineInput);
    }
console.log(fine);

    try {
      const res = await returnBook(selectedRequest._id, {
        returnDate: returnDateInput,
        fine,
      });

      console.log("Return success:", res.data);

      setShowModal(false);
      loadData(); // Refresh table
    } catch (err) {
      console.error(err);
      alert("Failed to return book");
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
              <LinkContainer to="/admin/students">
                <Nav.Link>View Students</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row className="mb-3">
          <Col>
            <h1>📊 Track Issued Books</h1>
          </Col>
        </Row>

        {/* SEARCH */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search student or book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* TABLE */}
        <Card>
          <Card.Header>
            <h5>Issued Books List</h5>
          </Card.Header>

          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Fine</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.student_id?.name}</strong>
                      <br />
                      <small>{item.student_id?.email}</small>
                    </td>

                    <td>
                      {item.book_id?.title}
                      <br />
                      <small className="text-muted">
                        by {item.book_id?.author}
                      </small>
                    </td>

                    <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                    <td>{new Date(item.returnDate).toLocaleDateString()}</td>
<td>
  {item.actual_returnDate
    ? new Date(item.actual_returnDate).toLocaleDateString()
    : "-"}
</td>

                    <td>
                      <Badge bg={getStatusVariant(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                    </td>

                    <td>
                      <Badge bg={getFineVariant(item.fine)}>
                        ₹{item.student_id.fine}
                      </Badge>
                    </td>

                    <td>
                      {item.status === "approved" ? (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleReturnClick(item)}
                        >
                          Return Book
                        </Button>
                      ) : (
                        <small className="text-muted">No actions</small>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* RETURN MODAL */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Return Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                value={returnDateInput}
                onChange={(e) => setReturnDateInput(e.target.value)}
              />
            </Form.Group>

            {/* Fine input if overdue */}
            {returnDateInput &&
              new Date(returnDateInput) >
                new Date(selectedRequest?.returnDate) && (
                <Form.Group className="mt-3">
                  <Form.Label>Fine (Late Return)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter fine amount"
                    value={fineInput}
                    onChange={(e) => setFineInput(e.target.value)}
                  />
                </Form.Group>
              )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>

            <Button variant="primary" onClick={handleReturnSubmit}>
              Confirm Return
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default TrackIssuedBooks;
