import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
