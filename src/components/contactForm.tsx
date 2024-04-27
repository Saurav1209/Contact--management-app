// ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, editContact } from '../store/contactSlice';
import { Contact } from '../types';
import Modal from './modal';

interface ContactFormProps {
  initialContact?: Contact; // Optional initial contact for editing
  onClose: () => void; // Function to close the modal
}

const ContactForm: React.FC<ContactFormProps> = ({ initialContact, onClose }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [status, setStatus] = useState('active');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialContact) {
      setFirstName(initialContact.firstName);
      setLastName(initialContact.lastName);
      setContactNumber(initialContact.contactNumber);
      setStatus(initialContact.status);
      setIsEditMode(true);
    }
  }, [initialContact]);
  const handleCancel = () => {
    onClose();
    setIsOpen(false);// Close the modal on cancel
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      id: isEditMode ? initialContact!.id : Date.now().toString(),
      firstName,
      lastName,
      contactNumber,
      status,
    };
    if (isEditMode) {
      dispatch(editContact({ id: initialContact!.id, contact: newContact }));
    } else {
      dispatch(addContact(newContact));
    }
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setStatus('active');
    onClose();
    setIsOpen(false); // Close the modal after submitting the form
  };

  return (
    <div>
       <h1 className="text-2xl text-center font-bold mt-3 ms-3">Contact Management App</h1>
      
        <button
          onClick={() => setIsOpen(true)}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mt-3 ms-3"
        >
          Add Contact
        </button>
     
      <Modal   isOpen={isOpen || isEditMode}  onClose={handleCancel} >
        <form onSubmit={handleSubmit} className="p-4">
          <h2 className="text-lg font-semibold mb-4">{isEditMode ? 'Edit' : 'Add'} Contact</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="form-radio h-4 w-4 text-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  value="inactive"
                  checked={status === 'inactive'}
                  onChange={() => setStatus('inactive')}
                  className="form-radio h-4 w-4 text-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isEditMode ? 'Save' : 'Add Contact'}
          </button>
        </form>
      </Modal>
    </div>

  );
};

export default ContactForm;
