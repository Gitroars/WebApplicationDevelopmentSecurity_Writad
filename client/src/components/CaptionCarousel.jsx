import React, { useEffect } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Badge
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/actions/libraryActions';

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

export default function CaptionCarousel() {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.books);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const [slider, setSlider] = React.useState(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = books.map((book) => ({
    title: book.name,
    text: book.description,
    imageURL: book.image,
    genre:book.category
  }));

  return (
    <Box
      position={'relative'}
      height={'600px'}
      width={'90%'}
      overflow={'hidden'}
      borderRadius={'20px'}
      marginX={'auto'}
      marginTop={'20px'} // Add margin to the top of the carousel
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)" // Add black light shadow border
      border="2px solid #e2e8f0" // Add light border
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((book, index) => (
          <Box
            key={index}
            height={'600px'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize={'cover'} // Maintain aspect ratio of the image
            borderRadius={'20px'} // Add a smooth curved edge
            backgroundColor={"blackAlpha.700"}
          >
            <Box 
            backgroundImage={`url(${book.imageURL})`}
            height={'700px'}
            width={'60%'} 
            backgroundRepeat={'no-repeat'}
            marginTop={'16%'}
            marginLeft={'14%'}></Box>
            <Container size="container.lg" height="600px" marginLeft={'40%'}>
            
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  color="White"
                >
                  {book.title}
                </Heading>
                <Box fontSize='1x1' fontWeight='semibold' lineHeight='tight' color='white'>
                Genre: <Badge rounded='80%' px='2' fontSize='0.8em' colorScheme='gray'>
                {book.genre}
                </Badge>
              </Box><Text fontSize={{ base: 'md', lg: 'lg' }} color="white" >      
                  {book.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
