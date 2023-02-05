import React from 'react';
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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/change_password" element={<ChangePassword />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/course/:id" element={<CourseDetails />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/forgot_password" element={<ForgotPassword />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/payment_success" element={<PaymentSuccess />}></Route>
        <Route path="/payment_failed" element={<PaymentFailed />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/request" element={<Request />}></Route>
        <Route path="/reset_password/:token" element={<ResetPassword />}></Route>
        <Route path="/subscribe" element={<Subscribe />}></Route>
        <Route path="/update_profile" element={<UpdateProfile />}></Route>
        <Route path="*" element={<NotFound />}></Route>

        {/* Admin Routes */}

        <Route path="/admin/courses" element={<CourseEditor />}></Route>
        <Route path="/admin/createcourse" element={<CreateCourse />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;