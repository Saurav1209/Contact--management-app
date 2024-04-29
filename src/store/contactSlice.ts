import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types';

//created a array of contacts for crud operations.
interface ContactsState {
  contacts: Contact[];
}

//check if cotacts is available or not in localstorage then created a new array for it.
const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem('contacts') || '[]'),
};

//crated contactSlice
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      //added contact to the contacts array
      state.contacts.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    editContact(state, action: PayloadAction<{ id: string; contact: Contact }>) {
      //find the index of the contact to be edited and update the data at that index and save array to localstorage.
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload.contact;
        localStorage.setItem('contacts', JSON.stringify(state.contacts));
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      //filtered the contacts array with the id of the contact to be deleted and saved in localStorage.
      const updatedContacts = state.contacts.filter((c) => c.id !== action.payload);
      state.contacts = updatedContacts;
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
