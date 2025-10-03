import { Box, Heading, Text, Button, Badge, HStack, Icon, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaCalendar, FaUser } from "react-icons/fa";

const MotionBox = motion(Box);

export default function BookCard({ book }) {
  return (
    <MotionBox
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 12px 24px rgba(0, 128, 128, 0.3)",
        y: -5 
      }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      p={6}
      bg="white"
      shadow="md"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bgGradient: "linear(to-r, teal.400, green.400)",
      }}
    >
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" w="full">
          <Badge colorScheme="teal" fontSize="xs" px={2} py={1} borderRadius="md">
            {book.genre}
          </Badge>
          {book.averageRating > 0 && (
            <HStack spacing={1} color="orange.400">
              <Icon as={FaStar} />
              <Text fontWeight="bold" fontSize="sm">
                {book.averageRating} ({book.reviewCount})
              </Text>
            </HStack>
          )}
        </HStack>

        <Heading fontSize="xl" color="gray.800" noOfLines={2}>
          {book.title}
        </Heading>

        <HStack spacing={2} fontSize="sm" color="gray.600">
          <Icon as={FaUser} />
          <Text noOfLines={1}>{book.author}</Text>
        </HStack>

        <HStack spacing={2} fontSize="sm" color="gray.500">
          <Icon as={FaCalendar} />
          <Text>{book.publishedYear}</Text>
        </HStack>

        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {book.description}
        </Text>

        <Button
          as={Link}
          to={`/books/${book._id}`}
          colorScheme="teal"
          size="sm"
          width="full"
          mt={2}
          _hover={{ transform: "translateY(-2px)", shadow: "md" }}
          transition="all 0.2s"
        >
          View Details & Reviews
        </Button>
      </VStack>
    </MotionBox>
  );
}
