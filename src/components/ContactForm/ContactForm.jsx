import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import css from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(addContact(values))
    actions.resetForm();
  }

  const nameFieldId = useId();
  const numberFiledId = useId();

  const initValues = {
    name: '',
    number: '',
  }

  const phoneRegExp = /^([1-9]{3})(-[1-9]{2}){2}$/
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required")
  });


  return (
    <div className={css.newContact}>
      <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema} >
        <Form className={css.form} >
          <div className={css.formItem}>
            <label htmlFor={nameFieldId}>Name:</label>
            <Field type="text" name="name" id={nameFieldId} />
            <ErrorMessage name="name" component="span" />
          </div>
          <div className={css.formItem}>
            <label htmlFor={numberFiledId}>Number:</label>
            <Field type="text" name="number" id={numberFiledId} />
            <ErrorMessage name="number" component="span" />
          </div>
          <button className={css.button} type="submit" >Add contact</button>
        </Form>
      </Formik>
    </div>
  )
}

export default ContactForm