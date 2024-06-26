// ContactList.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Contact } from '../types';
import Modal from './modal';
import { deleteContact } from '../store/contactSlice';
import ContactForm from './contactForm'

const ContactList: React.FC = () => {
  //Used the useSelector hook to select the contacts array from the Redux store's state.
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [isOpenView, setIsOpenView] = useState(false);  //used to open a modal to display the contact information
  const [isOpenEdit, setIsOpenEdit] = useState(false);   
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);//select particular contact to perform operations.
  const dispatch = useDispatch();

  //Event handler fns.
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
      {/* if conatcts array is empy it will display the message */}
      {contacts.length === 0 && (
        <p className="text-center text-red-500 font-semibold text-lg mt-8">No contacts found<br />Please add contact from add contact button.</p>
      )}
  {/* used map to display all the contacts present in array */}
      <ul className="grid grid-cols-1 gap-4">
        {contacts.map((contact: Contact) => (
          <li key={contact.id} className='bg-white rounded-lg shadow-md p-4 mb-4'>
            <div className="  sm:flex sm:flex-row sm:items-center sm:justify-between flex flex-col">
              <div className='mb-1 sm:mb-5'>
                <p><b>{contact.contactNumber}</b></p>
              </div>
              <div className='mt-0  justify-end sm:mt-5'>
                <button
                  onClick={() => handleViewContact(contact)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 sm:py-1 sm:px-1 sm:text-sm sm:rounded-md "
                >
                  View
                </button>
                <button onClick={() => handleEditContact(contact)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 sm:py-1 sm:px-1 sm:text-sm sm:rounded-md">Edit</button>
                <button onClick={() => handleDeleteContact(contact.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg sm:py-1 sm:px-1 sm:text-sm sm:rounded-md">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* modal will open when we click on view button and selected item will be displayed. */}
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
