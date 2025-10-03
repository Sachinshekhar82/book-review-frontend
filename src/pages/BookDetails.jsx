import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Divider, Spinner, Center, Badge, HStack, Icon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaUser, FaCalendar, FaStar } from "react-icons/fa";
import API from "../api";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import PageFade from "../components/PageFade";
import { useAuth } from "../context/AuthContext";

export default function BookDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/books/${id}`),
      API.get(`/reviews/book/${id}`)
    ]).then(([bookRes, reviewRes]) => {
      setBook(bookRes.data.data);
      setReviews(reviewRes.data.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
    // Update book average rating locally
    setBook(prev => ({
      ...prev,
      reviewCount: prev.reviewCount + 1,
      averageRating: ((prev.averageRating * prev.reviewCount) + review.rating) / (prev.reviewCount + 1)
    }));
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }

  if (!book) {
    return <Text textAlign="center" mt={10}>Book not found</Text>;
  }

  return (
    <PageFade>
      <Box maxW="800px" mx="auto" p={6} bg="white" borderRadius="xl" shadow="lg" mt={8}>
        <Badge colorScheme="teal" mb={3} fontSize="md">{book.genre}</Badge>
        <Heading size="xl" mb={2}>{book.title}</Heading>
        
        <HStack spacing={4} mb={4} color="gray.600">
          <HStack>
            <Icon as={FaUser} />
            <Text fontSize="lg">{book.author}</Text>
          </HStack>
          <HStack>
            <Icon as={FaCalendar} />
            <Text>{book.publishedYear}</Text>
          </HStack>
          {book.averageRating > 0 && (
            <HStack color="orange.400">
              <Icon as={FaStar} />
              <Text fontWeight="bold">{book.averageRating} ({book.reviewCount} reviews)</Text>
            </HStack>
          )}
        </HStack>

        <Text color="gray.700" mb={4}>{book.description}</Text>
        <Text fontSize="sm" color="gray.500">Added by: {book.addedBy?.name}</Text>

        <Divider my={6} />

        {isAuthenticated ? (
          <ReviewForm bookId={id} onReviewAdded={addReview} />
        ) : (
          <Text textAlign="center" color="gray.500" mb={6}>
            Please login to add a review
          </Text>
        )}

        <ReviewList reviews={reviews} />
      </Box>
    </PageFade>
  );
}
