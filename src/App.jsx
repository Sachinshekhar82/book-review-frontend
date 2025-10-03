import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddEditBook from "./pages/AddEditBook";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/add-book" 
          element={
            <ProtectedRoute>
              <AddEditBook />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-book/:id" 
          element={
            <ProtectedRoute>
              <AddEditBook />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}
