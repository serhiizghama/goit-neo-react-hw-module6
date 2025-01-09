import { useSelector } from 'react-redux'
import { selectContacts } from '../../redux/contactsSlice'
import { selectNameFilter } from '../../redux/filtersSlice'

import Contact from '../Contact/Contact'
import css from './ContactList.module.css'

function ContactList() {
  const contacts = useSelector(selectContacts)
  const nameFilter = useSelector(selectNameFilter)
  const contactList = contacts.filter(itm => { return itm.name.search(RegExp(nameFilter, 'i')) >= 0 })

  return (
    <div className={css.contacts}>
      {contactList.map(itm => {
        return (<Contact key={itm.id} {...itm} />)
      })}
    </div>)
}

export default ContactList
