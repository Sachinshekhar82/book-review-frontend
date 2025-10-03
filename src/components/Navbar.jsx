import { 
  Box, Flex, Link, Spacer, Button, Icon, IconButton, 
  useDisclosure, Drawer, DrawerOverlay, DrawerContent, 
  DrawerCloseButton, DrawerHeader, DrawerBody, VStack 
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen, FaHome, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from '../context/AuthContext';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = isAuthenticated
    ? [
        { label: "Books", path: "/", icon: FaHome },
        { label: "Profile", path: "/profile", icon: FaUser },
      ]
    : [
        { label: "Books", path: "/", icon: FaHome },
        { label: "Login", path: "/login", icon: FaSignInAlt },
        { label: "Sign Up", path: "/signup", icon: FaUserPlus },
      ];

  return (
    <MotionBox
      as="nav"
      bgGradient="linear(to-r, teal.500, teal.600, green.500)"
      px={[4, 6, 8]}
      py={4}
      color="white"
      shadow="lg"
      position="sticky"
      top="0"
      zIndex="1000"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Flex align="center" maxW="1200px" mx="auto">
        {/* Logo with Animation */}
        <MotionFlex
          as={RouterLink}
          to="/"
          align="center"
          gap="3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon as={FaBookOpen} boxSize={8} />
          <Box
            fontWeight="bold"
            fontSize={['xl', '2xl']}
            letterSpacing="wide"
            bgGradient="linear(to-r, white, yellow.200)"
            bgClip="text"
          >
            BookHub
          </Box>
        </MotionFlex>

        <Spacer />

        {/* Desktop Navigation */}
        <Flex display={["none", "none", "flex"]} gap="6" align="center" fontWeight="medium">
          {navItems.map((item) => (
            <MotionBox
              key={item.path}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                as={RouterLink}
                to={item.path}
                display="flex"
                alignItems="center"
                gap="2"
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
                transition="all 0.2s"
              >
                <Icon as={item.icon} />
                {item.label}
              </Link>
            </MotionBox>
          ))}

          {isAuthenticated && (
            <>
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  colorScheme="whiteAlpha"
                  variant="outline"
                  onClick={logout}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  Logout
                </Button>
              </MotionBox>

              {user && (
                <Box
                  bg="whiteAlpha.300"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  👋 {user.name}
                </Box>
              )}
            </>
          )}
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          display={["flex", "flex", "none"]}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
          size="lg"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bgGradient="linear(to-b, teal.500, teal.700)">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white" borderBottomWidth="1px" borderColor="whiteAlpha.300">
            <Flex align="center" gap="2">
              <Icon as={FaBookOpen} boxSize={6} />
              BookHub
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  onClick={onClose}
                  display="flex"
                  alignItems="center"
                  gap="3"
                  px={4}
                  py={3}
                  borderRadius="md"
                  color="white"
                  bg="whiteAlpha.100"
                  _hover={{ bg: "whiteAlpha.300", textDecoration: "none", transform: "translateX(5px)" }}
                  transition="all 0.3s"
                >
                  <Icon as={item.icon} boxSize={5} />
                  {item.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  {user && (
                    <Box
                      bg="whiteAlpha.200"
                      px={4}
                      py={3}
                      borderRadius="md"
                      color="white"
                      textAlign="center"
                    >
                      Welcome, <strong>{user.name}</strong>!
                    </Box>
                  )}
                  <Button
                    colorScheme="red"
                    variant="solid"
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}
