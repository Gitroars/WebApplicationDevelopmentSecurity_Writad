import React from 'react';
import { Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BiBookHeart } from 'react-icons/bi';
import {useColorMode} from '@chakra-ui/react'

const links = [
    {linkName: 'Books', path: '/books'},
    {linkName:'Cart',path:'/cart'}
]

const NavLink = ({path,children}) =>(
    <Link as={ReactLink} to={path} px={2} rounded='md' _hover={{textDecoration:'none',bg:useColorModeValue('gray.200')}}>{children}</Link>
)

const Navbar = () => {
  // Manage state for mobile menu toggle
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box backgroundColor="gray.150" paddingX={5}>
      <Flex height={35} alignItems='center' justifyContent='space-between'>
        {/* Mobile menu toggle button */}
        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          {/* Logo and navigation link */}
          <Link as={ReactLink} to='/'>
            <Flex alignItems='center'>
              <Icon as={BiBookHeart} height={8} width={8} color='orange.500' />
              <Text fontWeight='extrabold'>WRITAD</Text>
              

            </Flex>
          </Link>
        <HStack>{links.map((link)=>(<NavLink key={link.linkName} path={link.path}>{link.linkName}</NavLink>))}</HStack>
        </HStack>
        <Flex alignItems='center'><NavLink><Icon as={colorMode==='light'? MoonIcon: SunIcon} alignSelf='center' onClick={()=> toggleColorMode()}></Icon></NavLink></Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
