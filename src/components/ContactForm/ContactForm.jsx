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

  const phoneRegExp = /^([1-9]{3})(-[1-9]{2}){2}$/;
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Имя должно содержать минимум 3 символа").max(50, "Имя не может превышать 50 символов").required("Имя обязательно"),
    number: Yup.string().matches(phoneRegExp, 'Номер телефона должен быть в формате XXX-XX-XX, где X — цифры от 1 до 9').required("Номер телефона обязателен")
  });

  // Функция для обработки ввода телефона и автоматического добавления черточек
  const handlePhoneChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 3 && value.length <= 5) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 5) {
      value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 7)}`;
    }
    setFieldValue('number', value);
  };

  return (
    <div className={css.newContact}>
      <Formik initialValues={initValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema} >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.formItem}>
              <label htmlFor={nameFieldId}>Name:</label>
              <Field type="text" name="name" id={nameFieldId} />
              <ErrorMessage name="name" component="span" />
            </div>
            <div className={css.formItem}>
              <label htmlFor={numberFiledId}>Number:</label>
              <Field
                type="text"
                name="number"
                id={numberFiledId}
                onChange={(e) => handlePhoneChange(e, setFieldValue)}
              />
              <ErrorMessage name="number" component="span" />
            </div>
            <button className={css.button} type="submit">Add contact</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactForm;
