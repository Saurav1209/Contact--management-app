// store/contactSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    editContact(state, action: PayloadAction<{ id: string; contact: Contact }>) {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload.contact;
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      const updatedContacts = state.contacts.filter((c) => c.id !== action.payload);
      state.contacts = updatedContacts;
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
