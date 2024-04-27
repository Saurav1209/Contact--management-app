import React from 'react'
import ContactForm from './contactForm'
import ContactList from './contactList'
function home() {
  return (
    <div>
      <ContactForm onClose={() => {}}/>
      <ContactList/>
    </div>
  )
}

export default home
