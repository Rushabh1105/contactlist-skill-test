import React, { useEffect } from 'react';
import ContactCard from './ContactCard';
import '../Styles/Contacts.css'
import { useDispatch, useSelector } from 'react-redux';
import { contactSelector, getContactsThunk } from '../Redux/Reducers/contact.Reducer';

function Contacts() {
  const {contacts} = useSelector(contactSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());  
  }, [])


  return (
    <div className='mt-2 p-2 contacts-list'>
        <h2>Your Contacts</h2>
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