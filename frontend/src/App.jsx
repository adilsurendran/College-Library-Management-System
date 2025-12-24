

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import BooksPage from "./pages/BooksPage";
import IssueRequestPage from "./pages/IssueRequestPage";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageIssueRequests from './pages/admin/ManageIssueRequests';
import TrackIssuedBooks from './pages/admin/TrackIssuedBooks';
import ViewStudents from './pages/admin/ViewStudents';
import RequestNewBook from './pages/RequestNewBook';
import ManageBookPurchaseRequests from './pages/admin/ManageBookPurchaseRequests';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issue-request"
          element={
            <ProtectedRoute>
              <IssueRequestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-book"
          element={
            <ProtectedRoute>
              <RequestNewBook />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/books"
          element={
            <AdminRoute>
              <ManageBooks />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/issue-requests"
          element={
            <AdminRoute>
              <ManageIssueRequests />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/track-books"
          element={
            <AdminRoute>
              <TrackIssuedBooks />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <ViewStudents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/newbook"
          element={
            <AdminRoute>
              < ManageBookPurchaseRequests/>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;