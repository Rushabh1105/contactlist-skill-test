// Importing react modules
import React from 'react';
// Importing the component styling
import '../Styles/ContactCard.css';
// importing the useDispatch hook
import { useDispatch } from 'react-redux';
// importing the reducer actions
import { contactAction, deleteContactThunk } from '../Redux/Reducers/contact.Reducer';
import { toast } from 'react-toastify';

function ContactCard(props) {
    // Getting contact data from props
    const { data } = props;
    // Declare dispatch variable
    const dispatch = useDispatch();
    // If user clicks on update button then it 
    // dispatches the action to set form data
    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(contactAction.setFormData(data))
    }

    // function to generate address string
    const address = () => {
        let addressString = '';
        if(data.address){
            const {street, suite, city, zipcode} = data.address;
            addressString = `${street} ${suite} ${city} ${zipcode}`
        }

        return addressString;
    }

    // this function handles the delete contact operation
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteContactThunk(data));
        toast.success('Deleted the contact');
        console.log('handleDelete')
    }

    // Return JSX for contact card
  return (
    <div className='contact-card text-bg-info'>
        {/* Contact name */}
        <h5> <b>Name:</b> {data.name}</h5>
        {/* contact email */}
        <p> <b>Email:</b> {data.email}</p>
        {/* contact phone */}
        <p> <b>Phone:</b> {data.phone}</p>
        {/* contact address */}
        <p> <b>Address:</b> {address()}</p>
        <div className='buttons'>
            <div className='crud-btn'>
                {/* Update contact button */}
                <button className='btn btn-warning' onClick={(e) =>handleUpdate(e)}>Update Contact</button>
                {/* Delete contact button */}
                <button className='btn btn-danger' onClick={(e) =>handleDelete(e)}>Delete Contact</button>
            </div>
        </div>
    </div>
  )
}

export default ContactCard