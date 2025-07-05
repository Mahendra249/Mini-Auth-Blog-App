import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/PostDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogPostsPage from "./pages/BlogPostsPage";
import NewPost from "./pages/NewPost";
import { AuthProvider } from "./context/AuthContext";
import MyProfile from "./pages/MyProfile";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <BlogPostsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createpost"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}
