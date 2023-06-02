import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  useToast,
  StepTitle,
} from "@chakra-ui/react";
import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, resetUpdateSuccess } from "../redux/actions/userActions";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({ description: "Profile saved", status: "success", isClosable: true });
      dispatch(resetUpdateSuccess());
    }
  }, [toast, updateSuccess]);

  return userInfo ? (
    <Formik
      initialValues={{ email: userInfo.email, password: "", name: userInfo.name, confirmPassword: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("A name is required."),
        email: Yup.string().email("Invalid email.").required("An email address is required."),
        password: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required."),
        confirmPassword: Yup.string()
          .min(1, "Password is too short - must contain at least 1 character.")
          .required("Password is required.")
          .oneOf([Yup.ref("password"), null], "Password must match"),
      })}
      onSubmit={(values) => {
        dispatch(updateProfile(userInfo._id, values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH='100vh'
          maxW={{ base: "3x1", lg: "7x1" }}
          mx='auto'
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "4", md: "8", lg: "12" }}
        >
          <Stack spacing='10' direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
            <Stack flex='1.5' mb={{ base: "2x1", md: "none" }}>
              <Heading fontSize='2x1' fontWeight='extrabold'>
                Profile
              </Heading>
              <Stack spacing='6'>
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}></Stack>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                  >
                    <AlertIcon />
                    <AlertTitle>We are sorry!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField
                      type='text'
                      name='name'
                      placeholder='Your first and last name'
                      label='full name'
                    ></TextField>
                    <TextField type='text' name='email' placeholder='you@example.com' label='email' />
                    <PasswordTextField type='password' name='password' placeholder='your password' label='password' />
                    <PasswordTextField
                      type='password'
                      name='confirmPassword'
                      placeholder='confirm your password'
                      label='confirmPassword'
                    />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='orange' size='lg' isLoading={loading} type='submit'>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{ bg: "gray.900" }}>
              <Card>
                <CardHeader>
                  <Heading size='md'>User Report</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Registered on {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default ProfileScreen;
