// ContactList.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Contact } from '../types';
import Modal from './modal';
import { deleteContact } from '../store/contactSlice';
import ContactForm from'./contactForm'

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const dispatch = useDispatch();

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsOpenView(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsOpenEdit(true);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
    setIsOpenView(false); // Close the view modal if it's open
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      {contacts.length === 0 && (
  <p className="text-center text-red-500 font-semibold text-lg mt-8">No contacts found<br/>Please add contact from add contact button.</p>
)}

      <ul className="grid grid-cols-1 gap-4">
        {contacts.map((contact: Contact) => (
          <li key={contact.id} className={`bg-white shadow-md rounded-lg p-4 flex items-center justify-between ${contact.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>
            <div>
              <p><b>{contact.contactNumber}</b></p>
            </div>
            <div>
              <button
                onClick={() => handleViewContact(contact)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
              >
                View
              </button>
              <button onClick={() => handleEditContact(contact)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2">Edit</button>
              <button onClick={() => handleDeleteContact(contact.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpenView} onClose={() => setIsOpenView(false)}>
        {selectedContact && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{selectedContact.firstName} {selectedContact.lastName}</h2>
            <p>Status: <span className={selectedContact.status === 'active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{selectedContact.status.toUpperCase()}</span></p>
          </div>
        )}
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
        {selectedContact && (
          <ContactForm initialContact={selectedContact} onClose={() => setIsOpenEdit(false)} />
        )}
      </Modal>
    </div>
  );
};

export default ContactList;
