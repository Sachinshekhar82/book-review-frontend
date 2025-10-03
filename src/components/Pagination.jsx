import { HStack, Button, Text, Icon } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <HStack justify="center" mt={8} spacing={4}>
      <Button
        leftIcon={<Icon as={FaChevronLeft} />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        colorScheme="teal"
        variant="outline"
      >
        Previous
      </Button>
      <Text fontWeight="bold" color="gray.700">
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        rightIcon={<Icon as={FaChevronRight} />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        colorScheme="teal"
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
}
