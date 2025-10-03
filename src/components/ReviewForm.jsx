import React, { useState } from "react";
import { 
  Box, Input, Button, Textarea, useToast, 
  HStack, FormControl, FormLabel, Select 
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import API from "../api";

const MotionBox = motion(Box);

export default function ReviewForm({ bookId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/reviews", { bookId, rating, reviewText });
      onReviewAdded(res.data.data);
      setReviewText("");
      setRating(5);
      toast({ 
        title: "Review added successfully!", 
        status: "success", 
        duration: 2000, 
        isClosable: true 
      });
    } catch (err) {
      toast({ 
        title: "Error", 
        description: err?.response?.data?.message || "Failed to add review.", 
        status: "error", 
        duration: 3000, 
        isClosable: true 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      as="form"
      mb={6}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
    >
      <FormControl mb={3}>
        <FormLabel>Rating</FormLabel>
        <Select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Your Review</FormLabel>
        <Textarea
          placeholder="Share your thoughts about this book..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          required
          rows={4}
        />
      </FormControl>

      <Button 
        type="submit" 
        colorScheme="teal" 
        width="full"
        isLoading={loading}
      >
        Submit Review
      </Button>
    </MotionBox>
  );
}
