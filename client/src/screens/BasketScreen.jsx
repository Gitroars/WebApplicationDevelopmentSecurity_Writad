// import React from "react";
// import {
//   Box,
//   Flex,
//   Heading,
//   HStack,
//   Link,
//   Stack,
//   useColorModeValue,
//   Spinner,
//   Alert,
//   AlertTitle,
//   AlertIcon,
//   AlertDescription,
//   Wrap,
// } from "@chakra-ui/react";
// import { Link as ReactLink } from "react-router-dom";

// const BasketScreen = () => {
//   return (
//     <Wrap spacing='30px' justify='center' minHeight='100vh'>
//       {loading ? (
//         <Stack direction='row' spacing={4}>
//           <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
//         </Stack>
//       ) : error ? (
//         <Alert status='error'>
//           <AlertIcon />
//           <AlertTitle>We are sorry!</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       ) : basket.length <= 0 ? (
//         <Alert status='warning'>
//           <AlertIcon />
//           <AlertTitle>Basket is empty!</AlertTitle>
//           <AlertDescription>
//             <Link as={ReactLink} to='/books'>
//               View Books
//             </Link>
//           </AlertDescription>
//         </Alert>
//       ) : (
//         <p>display</p>
//       )}
//     </Wrap>
//   );
// };

// export default BasketScreen;
