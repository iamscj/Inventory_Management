import {
  Box,
  Button,
  Flex,
  Img,
  Spacer,
  Text,
  useMediaQuery,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import chakraHero from '../assets/chakraHero.jpg';
// import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// import Slider from 'react-slick';


const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};


const Hero = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  return (
    <section id="aboutus">
      <Flex
        alignItems="center"
        w="full"
        px={isLargerThanLG ? '16' : '6'}
        py="16"
        minHeight="90vh"
        justifyContent="space-between"
        flexDirection={isLargerThanLG ? 'row' : 'column'}
      >
        <Box mr={isLargerThanLG ? '6' : '0'} w={isLargerThanLG ? '60%' : 'full'}>
          <Text
            fontSize={isLargerThanLG ? '5xl' : '4xl'}
            fontWeight="bold"
            mb="4"
           className='magic'>
            {' '}
            Inventory Management System
          </Text>

          <Text mb="6" fontSize={isLargerThanLG ? 'lg' : 'base'} opacity={0.7}>
            An inventory management system (or inventory system) is the process by which you track your goods throughout your entire supply chain, from purchasing to production to end sales.
          </Text>

          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThanLG ? 'lg' : 'md'}
            mb={isLargerThanLG ? '0' : '10'}>
            Read More
          </Button>
        </Box>
        <Spacer />
        <Flex
          w={isLargerThanLG ? '40%' : 'full'}
          alignItems="center"
          justifyContent="center"
        >
          <Img src={chakraHero} alt="Chakra UI" />
        </Flex>
      </Flex>
    </section>
  );
};

export default Hero;