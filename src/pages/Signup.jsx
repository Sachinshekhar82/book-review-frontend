import React, { useState } from "react";
import { 
  Box, Input, Button, Heading, useToast, 
  FormControl, FormLabel, Text, Link as ChakraLink 
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import PageFade from "../components/PageFade";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await API.post("/auth/register", { name, email, password });
      toast({ 
        title: "Registration successful!", 
        description: "Please log in with your credentials.",
        status: "success", 
        duration: 3000,
        isClosable: true 
      });
      navigate("/login");
    } catch (err) {
      toast({ 
        title: "Registration failed", 
        description: err.response?.data?.message || "Something went wrong", 
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
        <Heading mb={6} textAlign="center">Sign Up</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input 
              placeholder="Enter your name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </FormControl>
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
              placeholder="Create a password (min 6 characters)" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              minLength={6}
              required
            />
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="teal" 
            width="full"
            isLoading={loading}
          >
            Sign Up
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <ChakraLink as={Link} to="/login" color="teal.500" fontWeight="bold">
            Login
          </ChakraLink>
        </Text>
      </Box>
    </PageFade>
  );
}
