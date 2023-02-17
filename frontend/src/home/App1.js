import AboutUs from './components/AboutUs';
import ImageSlider from "./components/ImageSlider";
import { SlideData } from "./components/SlideData";
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import React, { useRef } from 'react';
import { useDisclosure, Box } from '@chakra-ui/react';
import DrawerComponent from './components/DrawerComponent';

function App1() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box>
      <Nav ref={btnRef} onOpen={onOpen} />
      <div id="home"></div>
      <ImageSlider slides={SlideData} />
      <Hero id="aboutus" />
      <AboutUs id="features" />
      <Services />
      <Testimonials />
      <ContactUs id="contactus" />
      <Footer />
      <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Box>
  );
}

export default App1;