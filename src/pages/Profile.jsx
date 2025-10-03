import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, 
  SimpleGrid, Spinner, Button, Text, Center, HStack, Icon,
  useToast, AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import API from '../api';
import BookCard from '../components/BookCard';
import PageFade from '../components/PageFade';

export default function Profile() {
  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      API.get('/books/user/me'),
      API.get('/reviews/user')
    ]).then(([booksRes, reviewsRes]) => {
      setUserBooks(booksRes.data.data);
      setUserReviews(reviewsRes.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete(`/books/${deleteId}`);
      setUserBooks(userBooks.filter(book => book._id !== deleteId));
      toast({ title: 'Book deleted successfully!', status: 'success', duration: 2000 });
      onClose();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Failed to delete book', 
        status: 'error',
        duration: 3000
      });
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }

  return (
    <PageFade>
      <Box p={[4, 8]} maxW="1400px" mx="auto">
        <HStack justify="space-between" mb={6}>
          <Heading>My Profile</Heading>
          <Button 
            as={Link} 
            to="/add-book" 
            colorScheme="teal" 
            leftIcon={<Icon as={FaPlus} />}
          >
            Add New Book
          </Button>
        </HStack>

        <Tabs colorScheme="teal" variant="enclosed">
          <TabList>
            <Tab>My Books ({userBooks.length})</Tab>
            <Tab>My Reviews ({userReviews.length})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {userBooks.length === 0 ? (
                <Text textAlign="center" color="gray.500" mt={8}>
                  You haven't added any books yet.
                </Text>
              ) : (
                <SimpleGrid columns={[1, 2, 3]} gap={6}>
                  {userBooks.map(book => (
                    <Box key={book._id} position="relative">
                      <BookCard book={book} />
                      <HStack 
                        position="absolute" 
                        top="10px" 
                        right="10px" 
                        spacing={2}
                      >
                        <Button
                          size="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={FaEdit} />}
                          onClick={() => navigate(`/edit-book/${book._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<Icon as={FaTrash} />}
                          onClick={() => {
                            setDeleteId(book._id);
                            onOpen();
                          }}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            <TabPanel>
              {userReviews.length === 0 ? (
                <Text textAlign="center" color="gray.500" mt={8}>
                  You haven't written any reviews yet.
                </Text>
              ) : (
                userReviews.map(review => (
                  <Box 
                    key={review._id} 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="md" 
                    mb={3}
                    bg="white"
                  >
                    <Heading size="sm" mb={2}>
                      {review.bookId?.title || 'Book deleted'}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      By: {review.bookId?.author}
                    </Text>
                    <Text mt={2}>Rating: {review.rating}/5</Text>
                    <Text mt={2} color="gray.700">{review.reviewText}</Text>
                    <Text fontSize="xs" color="gray.400" mt={2}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Book
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This will also delete all reviews for this book. This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </PageFade>
  );
}
