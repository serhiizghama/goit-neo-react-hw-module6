import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import { IoCallSharp, IoPersonSharp } from "react-icons/io5";
import css from './Contact.module.css'

function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteContact(id));
  }

  return (
    <div className={css.contact}>
      <div className={css.data}>
        <span><IoPersonSharp /> {name}</span>
        <span><IoCallSharp /> {number}</span>
      </div>
      <button className={css.delButton} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Contact;