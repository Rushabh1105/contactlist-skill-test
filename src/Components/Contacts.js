// Importing the react hooks
import React, { useEffect } from 'react';
// Import contact card component
import ContactCard from './ContactCard';
// Importing the styling
import '../Styles/Contacts.css'
// Importing the redux hooks
import { useDispatch, useSelector } from 'react-redux';
// Importing the reducer actions
import { contactSelector, getContactsThunk } from '../Redux/Reducers/contact.Reducer';

function Contacts() {
  // Get contacts from reducer
  const {contacts} = useSelector(contactSelector);
  // To dispatch some action
  const dispatch = useDispatch();

  // When component mounts then dispatch the get contacts from
  // backend thunk and update the contacts data
  useEffect(() => {
    dispatch(getContactsThunk());  
  }, [dispatch])

  // Return the contacts component
  return (
    <div className='mt-2 p-2 contacts-list'>
        <h2>Your Contacts</h2>
        {/* For every contact it renders the contact card component */}
        <div className='contacts'>
            {
                contacts.map((contact, idx) => (
                    <ContactCard data={contact} key={idx} />
                ))
            }
        </div>
    </div>
  )
}

export default Contacts