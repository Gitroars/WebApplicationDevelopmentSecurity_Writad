import React, { useState } from "react";
import { useToast, Box, FormControl, FormLabel, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createBook } from "../redux/actions/bookActions";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Book Title is required"),
  description: Yup.string().required("Book Description is required"),
  category: Yup.string().required("Book Category is required"),
  chapterTitle: Yup.string().required("First Chapter Title is required"),
  chapterContent: Yup.string().required("First Chapter Content is required"),
  image: Yup.mixed().required("Book Image is required"),
  price: Yup.number().required("Book Price is required"),
});

const CreateBookScreen = ({ onSave }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const initialValues = {
    title: "",
    description: "",
    category: "",
    chapterTitle: "",
    chapterContent: "",
    image: null,
    price: "",
  };

  const handleSave = (values) => {
    const { image, title, description, category, chapterTitle, chapterContent, price } = values;

    const bookData = {
      image,
      title,
      description,
      genre: category,
      chapterName: chapterTitle,
      chapterContent,
      price,
    };

    dispatch(createBook(bookData));
    toast({ description: "Created new book", status: "success", isClosable: true });
  };

  return (
    <Box maxW='600px' m='auto' p='4'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
        <Form>
          <Field name='image'>
            {({ form, field }) => (
              <FormControl mb='4' isInvalid={form.errors.image && form.touched.image}>
                <FormLabel>Book Image</FormLabel>
                <Input {...field} type='file' accept='image/*' />
                <ErrorMessage name='image' component='div' color='red' />
              </FormControl>
            )}
          </Field>
          <Field name='title'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.title && form.touched.title}>
                <FormLabel>Book Title</FormLabel>
                <Input {...field} type='text' />
                <ErrorMessage name='title' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Field name='description'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.description && form.touched.description}>
                <FormLabel>Book Description</FormLabel>
                <Textarea {...field} rows={6} />
                <ErrorMessage name='description' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Field name='category'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.category && form.touched.category}>
                <FormLabel>Genre</FormLabel>
                <Select {...field}>
                  <option value='adventure'>Adventure</option>
                  <option value='drama'>Drama</option>
                  <option value='romance'>Romance</option>
                  <option value='science-fiction'>Science Fiction</option>
                  <option value='horror'>Horror</option>
                </Select>
                <ErrorMessage name='category' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Field name='chapterTitle'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.chapterTitle && form.touched.chapterTitle}>
                <FormLabel>First Chapter Title</FormLabel>
                <Input {...field} type='text' />
                <ErrorMessage name='chapterTitle' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Field name='chapterContent'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.chapterContent && form.touched.chapterContent}>
                <FormLabel>First Chapter Content</FormLabel>
                <Textarea {...field} rows={6} />
                <ErrorMessage name='chapterContent' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Field name='price'>
            {({ field, form }) => (
              <FormControl mb='4' isInvalid={form.errors.price && form.touched.price}>
                <FormLabel>Book Price</FormLabel>
                <Input {...field} type='number' />
                <ErrorMessage name='price' component='div' color='red' />
              </FormControl>
            )}
          </Field>

          <Button type='submit' colorScheme='blue'>
            Submit
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateBookScreen;
