import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Flex,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const DrawerComponent = ({ isOpen, onClose, btnRef }) => {
  const navigate=useNavigate();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      zIndex="popover"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Chakra</DrawerHeader>

        <DrawerBody>
          <Flex flexDirection="column">
            <Link mb="5">About</Link>
            <Link mb="5">More Apps</Link>
              <Button variant={'outline'} colorScheme='teal' mb="5" onClick={() => {
                navigate('/login')
              }}>Sign In</Button>
              <Button colorScheme='teal' mb="5" onClick={() => {
                navigate('/register')
              }}>Sign Up</Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;