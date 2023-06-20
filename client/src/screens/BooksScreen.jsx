import { Center, Wrap, WrapItem, Spinner, Stack, Alert, AlertIcon, AlertDescription, AlertTitle ,MenuButton,Button,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,Text, button,useControllableState} from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions/bookActions";
import { useEffect,useState } from "react";
import CaptionCarousel from "../components/CaptionCarousel";
import {ChevronDownIcon} from "@chakra-ui/icons"



const BooksScreen = () => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.books);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  
const [category,setCategory]= useState('')
  
 const Display=()=>{
  if (category=='') {
    return(
      <Wrap spacing='30px' justify='center' minHeight='100vh'>
        {books.map((book) => (
          <WrapItem key={book._id}>
            <Center w='250px' h='550px'>
              <BookCard book={book} isBooks={false} />
            </Center>
          </WrapItem>
        ))}
      </Wrap>)
  }else{
    if (category==books.category){
      return(
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
        {books.map((book) => (
          <WrapItem key={book._id}>
            <Center w='250px' h='550px'>
              <BookCard book={book} isBooks={false} />
            </Center>
          </WrapItem>
        ))}
      </Wrap>)}
  }
  
}


const sorting=()=>{
  return(<Menu>
    <MenuButton px='4' py='2' transition='all 0.3s' as={Button} >
          Sorting <ChevronDownIcon />
      </MenuButton>
      <MenuList >
          <MenuItem onClick={() => setCategory('')}>
            <Text ml='2'>No Sort</Text>
          </MenuItem>
          <MenuItem onClick={()=>setCategory('Adventure')}>
          <Text ml='2'>Adventure</Text>  
          </MenuItem><MenuItem onClick={()=>setCategory('Drama')}>
            <Text ml='2'>Drama</Text>
          </MenuItem>
          <MenuItem onClick={()=>setCategory('Romance')}>
            <Text ml='2'>Romance</Text>
          </MenuItem>
          <MenuItem onClick={()=>setCategory('Science Fiction')}>
            <Text ml='2'>Science Fiction</Text>
          </MenuItem>
          <MenuItem onClick={()=>setCategory('Horror')}>
            <Text ml='2'>Horror</Text>
          </MenuItem>
      </MenuList>
  </Menu>)
}

  return (
    <>
      <CaptionCarousel />
      {sorting()}
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) 
      : (
        Display()
      )}
      
    </>
  );
};

export default BooksScreen;
