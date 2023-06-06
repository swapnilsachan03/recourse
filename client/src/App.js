import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './components/About/About';
import ForgotPassword from './components/Auth/ForgotPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Courses from './components/Courses/Courses';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Request from './components/Request/Request';
import Subscribe from './components/Payments/Subscribe';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFailed from './components/Payments/PaymentFailed';
import NotFound from './components/Layout/NotFound';
import CourseDetails from './components/CourseDetails/CourseDetails';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import CourseEditor from './components/Admin/CourseEditor/CourseEditor';
import Users from './components/Admin/Users/Users';
import Loader from './components/Layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { getUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";

function App() {
  const { isAuthenticated, user, loading, message, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch({ type: "clearError" });
    }

    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message])

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <Router>
      {
        loading ? ( <Loader /> ) : (
        
        <>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          
          <Route
            path="/change_password"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }>
          </Route>

          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/course/:id" element={<CourseDetails />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          
          <Route
            path="/forgot_password"
            redirect={"/profile"}
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated}>
                <ForgotPassword />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Login />
              </ProtectedRoute>
            }>
          </Route>

          <Route path="/payment_success" element={<PaymentSuccess />}></Route>
          <Route path="/payment_failed" element={<PaymentFailed />}></Route>
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path="/register"
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <Register />
              </ProtectedRoute>
            }>
          </Route>

          <Route path="/request" element={<Request />}></Route>
          
          <Route
            path="/reset_password/:token"
            redirect={"/profile"}
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated}>
                <ResetPassword />
              </ProtectedRoute>
            }>
          </Route>
          
          <Route
            path="/subscribe"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Subscribe />
              </ProtectedRoute>
            }>
          </Route>
          
          <Route
            path="/update_profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile user={user} />
              </ProtectedRoute>
            }>
          </Route>

          <Route path="*" element={<NotFound />}></Route>

          {/* Admin Routes */}

          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                <CourseEditor />
              </ProtectedRoute>
            }>
          </Route>
          
          <Route
            path="/admin/createcourse"
            element={
              <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                <CreateCourse />
              </ProtectedRoute>
            }>
          </Route>
          
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                <Dashboard />
              </ProtectedRoute>
            }>
          </Route>
          
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === "admin"}>
                <Users />
              </ProtectedRoute>
            }>
          </Route>
        </Routes>
        <Footer />

        <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;