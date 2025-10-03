import React, { useState } from "react";
import { 
  Box, Input, Button, Heading, useToast, 
  FormControl, FormLabel, Text, Link as ChakraLink 
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import PageFade from "../components/PageFade";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      toast({ title: "Logged in successfully!", status: "success", duration: 2000, isClosable: true });
      navigate("/");
    } catch (err) {
      toast({ 
        title: "Login failed", 
        description: err.response?.data?.message || "Invalid credentials", 
        status: "error", 
        duration: 3000,
        isClosable: true 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageFade>
      <Box maxW="400px" mx="auto" mt={12} p={8} borderWidth="1px" borderRadius="xl" bg="white" shadow="lg">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email"
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="teal" 
            width="full" 
            isLoading={loading}
          >
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <ChakraLink as={Link} to="/signup" color="teal.500" fontWeight="bold">
            Sign Up
          </ChakraLink>
        </Text>
      </Box>
    </PageFade>
  );
}
