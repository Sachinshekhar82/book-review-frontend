import React, { useState, useEffect } from 'react';
import {
  Box, Heading, SimpleGrid, Spinner, Text, Input, Select, HStack, Button, Center
} from '@chakra-ui/react';
import API from '../api';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import PageFade from '../components/PageFade';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('');

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 9, search, genre, sort };
      const res = await API.get('/books', { params });
      setBooks(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, search, genre, sort]);

  return (
    <PageFade>
      <Box p={[4, 8]} maxW="1400px" mx="auto">
        <Heading mb={6} textAlign="center" letterSpacing="wide" size="xl">
          📚 Discover Amazing Books
        </Heading>

        <HStack mb={6} spacing={4} flexWrap="wrap" justify="center">
          <Input
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxW="300px"
            bg="white"
          />
          <Select 
            placeholder="Filter by Genre" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            maxW="200px"
            bg="white"
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </Select>
          <Select 
            placeholder="Sort by" 
            value={sort} 
            onChange={(e) => setSort(e.target.value)} 
            maxW="200px"
            bg="white"
          >
            <option value="year">Published Year</option>
            <option value="rating">Average Rating</option>
          </Select>
          <Button 
            colorScheme="red" 
            onClick={() => { 
              setSearch(''); 
              setGenre(''); 
              setSort(''); 
            }}
          >
            Clear
          </Button>
        </HStack>

        {loading ? (
          <Center mt={10}>
            <Spinner size="xl" color="teal.500" thickness="4px" />
          </Center>
        ) : books.length === 0 ? (
          <Text mt={8} textAlign="center" fontSize="lg" color="gray.500">
            No books found. Try adjusting your search.
          </Text>
        ) : (
          <>
            <SimpleGrid columns={[1, 2, 3]} gap={6}>
              {books.map(book => <BookCard key={book._id} book={book} />)}
            </SimpleGrid>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Box>
    </PageFade>
  );
}
