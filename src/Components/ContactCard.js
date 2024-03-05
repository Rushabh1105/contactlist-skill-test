import React from 'react';
import '../Styles/ContactCard.css'
import { useDispatch } from 'react-redux';
import { contactAction, deleteContactThunk } from '../Redux/Reducers/contact.Reducer';

function ContactCard(props) {
    const { data } = props;

    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(contactAction.setFormData(data))
    }

    const address = () => {
        let addressString = '';
        if(data.address){
            const {street, suite, city, zipcode} = data.address;
            addressString = `${street} ${suite} ${city} ${zipcode}`
        }

        return addressString;
    }

    const handleDelete = () => {
        dispatch(deleteContactThunk(data))
    }

  return (
    <div className='contact-card text-bg-info'>
        <h5> <b>Name:</b> {data.name}</h5>
        <p> <b>Email:</b> {data.email}</p>
        <p> <b>Phone:</b> {data.phone}</p>
        <p> <b>Address:</b> {address()}</p>
        <div className='buttons'>
            <div className='crud-btn'>
                <button className='btn btn-warning' onClick={handleUpdate}>Update Contact</button>
                <button className='btn btn-danger' onClick={handleDelete}>Delete Contact</button>
            </div>
        </div>
    </div>
  )
}

export default ContactCard