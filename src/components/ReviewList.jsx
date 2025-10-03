import { Box, Text, HStack, Icon, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ReviewList({ reviews }) {
  return (
    <Box>
      <Text fontWeight="bold" mb={4} fontSize="lg" letterSpacing="wide">
        Reviews ({reviews.length})
      </Text>
      {reviews.length === 0 ? (
        <Text color="gray.500">No reviews yet! Be the first to review.</Text>
      ) : (
        <VStack spacing={3} align="stretch">
          {reviews.map((review, idx) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Box
                borderWidth="1px"
                borderRadius="md"
                p={4}
                bg="gray.50"
                boxShadow="sm"
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="semibold" color="gray.700">
                    {review.userId?.name || "Anonymous"}
                  </Text>
                  <HStack spacing={1} color="orange.400">
                    <Icon as={FaStar} />
                    <Text fontWeight="bold">{review.rating}</Text>
                  </HStack>
                </HStack>
                <Text color="gray.600">{review.reviewText}</Text>
                <Text fontSize="xs" color="gray.400" mt={2}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </motion.div>
          ))}
        </VStack>
      )}
    </Box>
  );
}
