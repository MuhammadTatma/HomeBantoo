import React from 'react';
import {
  Flex,
  Heading,
  Link as ChakraLink,
  Image,
  Collapse,
  IconButton,
  useDisclosure,
  Box
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, CloseIcon,Icon } from '@chakra-ui/icons';
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  const menuItems = [
    { label: 'Add Inventory Item', to: '/add-inventory' },
    { label: 'Inventory List', to: '/inventory-list' },
    { label: 'Expiring Soon List', to: '/expiring-soon-list' },
  ];

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#FFFFFF"
      color="#D80202"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      width="100%"
      mx="auto"
    >
      <Flex align="center">
        <Image src="/Logo.png" alt="Logo" boxSize="40px" mr="2" />
        <Heading as="h1" size="lg">
          <Link to="/" style={{ textDecoration: 'none', color: '#D80202' }}>
            Homebantoo
          </Link>
        </Heading>
      </Flex>

      {/* Mobile Menu Button */}
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={onToggle}
          variant="ghost"
        />
      </Box>

      {/* Desktop Menu */}
      <Flex
        align={{ base: 'center', md: 'center', lg: 'center', xl: 'center' }}
        justify={{ base: 'center', md: 'flex-end' }}  
        display={{ base: 'none', md: 'flex' }}
        paddingRight={40}
      >
        <Box>
          {menuItems.map((item) => (
            <ChakraLink as={Link} to={item.to} key={item.label} mr={{ base: 2, md: 4 }}>
              {item.label}
            </ChakraLink>
          ))}
        </Box>
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          mt={{ base: 4, md: 0 }}
          display={{ base: 'block', md: 'none' }}
          textAlign="center"
        >
          {menuItems.map((item) => (
            <ChakraLink
              as={Link}
              to={item.to}
              key={item.label}
              block
              p={2}
              onClick={onToggle}
            >
              {item.label}
            </ChakraLink>
          ))}
        </Box>
      </Collapse>

      {/* Profile Icon */}
      <Flex align="center">
        <Flex align="center">
          <Box ml={{ base: 2, md: 4 }}>
            <ChakraLink as={Link} to="/profile">
              <Icon as={CgProfile} boxSize={8} />
            </ChakraLink>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
