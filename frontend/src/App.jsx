// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <div>
// // //         <a href="https://vite.dev" target="_blank">
// // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // //         </a>
// // //         <a href="https://react.dev" target="_blank">
// // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // //         </a>
// // //       </div>
// // //       <h1>Vite + React</h1>
// // //       <div className="card">
// // //         <button onClick={() => setCount((count) => count + 1)}>
// // //           count is {count}
// // //         </button>
// // //         <p>
// // //           Edit <code>src/App.jsx</code> and save to test HMR
// // //         </p>
// // //       </div>
// // //       <p className="read-the-docs">
// // //         Click on the Vite and React logos to learn more
// // //       </p>
// // //     </>
// // //   )
// // // }

// // // export default App

// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Dashboard from "./pages/Dashboard";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Protected Routes */}
// //         <Route
// //           path="/"
// //           element={
// //             <ProtectedRoute>
// //               <Dashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import StudentDashboard from "./pages/StudentDashboard";
// import BooksPage from "./pages/BooksPage";
// import IssueRequestPage from "./pages/IssueRequestPage";
// import HistoryPage from "./pages/HistoryPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/books"
//           element={
//             <ProtectedRoute>
//               <BooksPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/issue-request"
//           element={
//             <ProtectedRoute>
//               <IssueRequestPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/history"
//           element={
//             <ProtectedRoute>
//               <HistoryPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;