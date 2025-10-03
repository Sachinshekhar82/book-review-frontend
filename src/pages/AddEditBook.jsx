import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, Input, Textarea, Select, Button, useToast, 
  FormControl, FormLabel 
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import PageFade from '../components/PageFade';

export default function AddEditBook() {
  const { id } = useParams();
  const isEditMode = !!id;
  const [formData, setFormData] = useState({
    title: '', 
    author: '', 
    description: '', 
    genre: '', 
    publishedYear: ''
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode) {
      API.get(`/books/${id}`).then(res => {
        const book = res.data.data;
        setFormData({
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre,
          publishedYear: book.publishedYear
        });
      });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditMode) {
        await API.put(`/books/${id}`, formData);
        toast({ title: 'Book updated successfully!', status: 'success', duration: 2000 });
      } else {
        await API.post('/books', formData);
        toast({ title: 'Book added successfully!', status: 'success', duration: 2000 });
      }
      navigate('/profile');
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Something went wrong', 
        status: 'error',
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageFade>
      <Box maxW="600px" mx="auto" p={6} bg="white" borderRadius="xl" shadow="lg" mt={8}>
        <Heading mb={6}>{isEditMode ? 'Edit Book' : 'Add New Book'}</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
            />
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Author</FormLabel>
            <Input 
              value={formData.author} 
              onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
              required 
            />
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              required 
              rows={4}
            />
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Genre</FormLabel>
            <Select 
              value={formData.genre} 
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })} 
              required
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Published Year</FormLabel>
            <Input 
              type="number" 
              value={formData.publishedYear} 
              onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })} 
              required 
              min="1000"
              max={new Date().getFullYear()}
            />
          </FormControl>
          
          <Button 
            type="submit" 
            colorScheme="teal" 
            width="full"
            isLoading={loading}
          >
            {isEditMode ? 'Update' : 'Add'} Book
          </Button>
        </form>
      </Box>
    </PageFade>
  );
}
