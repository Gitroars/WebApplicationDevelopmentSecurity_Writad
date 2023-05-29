import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  useColorModeValue,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BiBookHeart } from "react-icons/bi";
import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";

const links = [
  { linkName: "Books", path: "/books" },
  { linkName: "Cart", path: "/cart" },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    rounded='md'
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.500"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  // Manage state for mobile menu toggle
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isHovering, SetIsHovering } = useState(false);
  return (
    <Box backgroundColor='gray.150' paddingX={5}>
      <Flex height={35} alignItems='center' justifyContent='space-between'>
        {/* Mobile menu toggle button */}
        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          as='nav'
          spacing={5}
          display={{ base: "none", md: "flex" }}
          onMouseEnter={() => SetIsHovering(true)}
          onMouseLeave={() => SetIsHovering(false)}
        >
          {/* Logo and navigation link */}
          <Link as={ReactLink} to='/' style={{ textDecoration: "none" }}>
            <Flex alignItems='center'>
              <Icon as={BiBookHeart} height={8} width={8} color={isHovering ? "cyan.400" : "orange.400"} />
              <Text fontWeight='extrabold'>WRITAD</Text>
            </Flex>
          </Link>
          <HStack>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems='center'>
          <NavLink>
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf='center'
              onClick={() => toggleColorMode()}
            ></Icon>
          </NavLink>
          <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
            Login
          </Button>
          <Button
            as={ReactLink}
            to='/registration'
            m={2}
            display={{ base: "none", md: "inline-flex" }}
            fontSize='sm'
            fontWeight={500}
            _hover={{ bg: "orange.150" }}
            bg='orange.300'
          >
            Register
          </Button>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={5} display={{ md: "none" }}>
          <Stack as='nav' spacing={5}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key='Register' path='/registration'>
              Registration
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
