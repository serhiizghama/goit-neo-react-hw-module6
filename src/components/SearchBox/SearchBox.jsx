import { useDispatch, useSelector } from 'react-redux'
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice'

import css from './SearchBox.module.css'

function SearchBox() {
  const searchName = useSelector(selectNameFilter)
  const dispatch = useDispatch()

  function handleChange(e) {
    dispatch(changeFilter(e.target.value))
  }

  return (
    <div className={css.search}>
      <p>Find contacts by name</p>
      <input className={css.searchBox} type="text" value={searchName} onChange={handleChange} />
    </div>
  )
}

export default SearchBox;