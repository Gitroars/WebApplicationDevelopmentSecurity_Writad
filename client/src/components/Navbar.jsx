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
  useToast,
  MenuButton,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { BiBookHeart } from "react-icons/bi";
import { MdLocalShipping, MdLogout } from "react-icons/md";
import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
const links = [
  { linkName: "Books", path: "/books" },
  { linkName: "Basket", path: "/basket" },
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
  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: "Logged out", status: "success", isClosable: true });
  };
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
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

          {userInfo ? (
            <>
              <Menu>
                <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to='/profile'>
                    {" "}
                    <CgProfile />
                    <Text ml='2'>Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to='/profile'>
                    {" "}
                    <MdLocalShipping />
                    <Text ml='2'>Purchases</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml='2'>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
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
            </>
          )}
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
