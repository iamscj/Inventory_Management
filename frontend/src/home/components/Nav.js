import React, { useState } from 'react';
import {
  Text,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaAlignJustify } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';
// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Nav = ({ onOpen, ref }) => {
  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue('white', 'blackAlpha.600');
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
  const navigate = useNavigate();
  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener('scroll', changeScroll);

  return (
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      bg={navBg}
    >
      <Link>
        <Text fontSize="xl" fontWeight="bold" pr={6} onClick={() => window.location.replace("/#home")}>
          Inv-QR
        </Text>
      </Link>

      <Button variant={'ghost'} onClick={() => window.location.replace("/#aboutus")}>
        About Us
      </Button>

      <Button variant={'ghost'} onClick={() => window.location.replace("/#features")}>
        Features
      </Button>

      <Button variant={'ghost'} onClick={() => window.location.replace("/#contactus")}>
        Contact us
      </Button>

      <Spacer />

      <Flex alignItems="center">
        <IconButton mr="10" w={6} h={6} p={5} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>

        {isLargerThanMD ? (
          //   <Button
          //   colorScheme={'green'}
          //   bg={'green.400'}
          //   rounded={'full'}
          //   px={6}
          //   _hover={{
          //     bg: 'gray.500',
          //   }}>
          //   Login
          // </Button>
          <ButtonGroup gap='0'>
            <Button variant={'outline'} colorScheme='teal' onClick={() => {
              navigate('/login')
            }}>Sign In</Button>
            <Button colorScheme='teal' onClick={() => {
              navigate('/register')
            }}>Sign Up</Button>
          </ButtonGroup>
        ) : (
          <IconButton ref={ref} onClick={onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        )}


      </Flex>
    </Flex>
  );
};

export default Nav;