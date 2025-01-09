import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import { nanoid } from 'nanoid';

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: []
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            name,
            number,
            id: nanoid()
          }
        };
      }
    },
    deleteContact(state, action) {
      return {
        ...state,
        items: state.items.filter((itm) => itm.id !== action.payload)
      };
    }
  },
  selectors: {
    selectContacts: (state) => state.items,
    selectContactByIdx: (state, idx) => state.items[idx] ?? {},
  }
});

export const { addContact, deleteContact } = slice.actions;
export const { selectContacts, selectContactByIdx } = slice.selectors;

const persistConfig = {
  key: 'contacts',
  storage,
}

export default persistReducer(persistConfig, slice.reducer)
