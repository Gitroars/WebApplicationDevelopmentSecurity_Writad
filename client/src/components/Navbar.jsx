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
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  MenuButton,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { BiBookHeart } from "react-icons/bi";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const BasketIcon = () => {
  const basketInfo = useSelector((state) => state.basket);
  const { basket } = basketInfo;
  return (
    <Flex>
      <Text fontStyle='italic' as='sub' fontSize='xs'>
        {basket.length}
      </Text>
      <Icon ml='-1.5' as={RiShoppingBasket2Line} h='4' w='7' alignSelf='center' />
      Basket
    </Flex>
  );
};

const links = [
  { linkName: "Books", path: "/books" },
  { linkName: <BasketIcon />, path: "/basket" },
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
    toast({ description: "Logged out successfully.", status: "success", isClosable: true });
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex height={50} alignItems='center' justifyContent='space-between'>
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
              cursor='pointer'
              mr='3'
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf='center'
              onClick={() => toggleColorMode()}
            />
            {userInfo ? (
              <Menu>
                <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                  {userInfo.name} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to='/profile'>
                    <CgProfile />
                    <Text ml='2'>Profile</Text>
                  </MenuItem>
                  <MenuItem as={ReactLink} to='/your-orders'>
                    <MdLocalShipping />
                    <Text ml='2'>Purchase history</Text>
                  </MenuItem>
                  {userInfo.isAdmin === "true" && (
                    <>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to={"/admin-console"}>
                        <MdOutlineAdminPanelSettings />
                        <Text ml='2'>Admin Console</Text>
                      </MenuItem>
                    </>
                  )}

                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>
                    <MdLogout />
                    <Text ml='2'>Logout</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
                  Log In
                </Button>
                <Button
                  as={ReactLink}
                  to='/registration'
                  m={2}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize='sm'
                  fontWeight={600}
                  _hover={{ bg: "orange.400" }}
                  bg='orange.500'
                  color='white'
                >
                  Register
                </Button>{" "}
              </>
            )}
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
