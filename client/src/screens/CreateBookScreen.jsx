import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  const initialValues = {
    title: "",
    description: "",
    category: "",
    chapterTitle: "",
    chapterContent: "",
    image: null,
    price: "",
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSave = (values) => {
    onSave(values);
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
                <FormLabel>Book Category</FormLabel>
                <Checkbox
                  m='3'
                  value='adventure'
                  isChecked={selectedCategory === "adventure"}
                  onChange={() => setSelectedCategory("adventure")}
                >
                  Adventure
                </Checkbox>
                <Checkbox
                  m='3'
                  value='drama'
                  isChecked={selectedCategory === "drama"}
                  onChange={() => setSelectedCategory("drama")}
                >
                  Drama
                </Checkbox>
                <Checkbox
                  m='3'
                  value='romance'
                  isChecked={selectedCategory === "romance"}
                  onChange={() => setSelectedCategory("romance")}
                >
                  Romance
                </Checkbox>
                <Checkbox
                  m='3'
                  value='science-fiction'
                  isChecked={selectedCategory === "science-fiction"}
                  onChange={() => setSelectedCategory("science-fiction")}
                >
                  Science Fiction
                </Checkbox>
                <Checkbox
                  m='3'
                  value='horror'
                  isChecked={selectedCategory === "horror"}
                  onChange={() => setSelectedCategory("horror")}
                >
                  Horror
                </Checkbox>
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
