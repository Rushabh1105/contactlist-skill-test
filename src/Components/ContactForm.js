// Importing react components
import React, { useEffect, useState } from 'react';
// Importing the styles
import '../Styles/ContactForm.css';
// importing redux hooks
import { useDispatch, useSelector } from 'react-redux';
// Importing reducer actions
import { addContactThunk, contactAction, contactSelector, updateContactThunk } from '../Redux/Reducers/contact.Reducer';
// Importing toast and its css
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contact form component
function ContactForm() {
  // Dispatch method to dispatch reducer actions 
  const dispatch = useDispatch();
  // getting data from selectors
  const { contacts, formData } = useSelector(contactSelector);
  // states for form input fields
  const [userData, setUserData] = useState({})
  const [address, setAddress] = useState({})

  // Preload input value or remove them 
  // depending upon form data value
  useEffect(() => {
    if(formData){
      // If form data is not null
      // Set the state to formdata value
      setUserData({
        id: formData.id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      })
      setAddress(formData.address)
    }else{
      // If no form data the clear the input fields
      clearInputFields()
    }
    // gets called everytime formdata get updated
  }, [formData]);

  // Function to clear the inputs fields
  const clearInputFields = () => {
    setUserData({
      id: '',
      name: '',
      phone: '',
      email: ''
    });
    setAddress({
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    })
  }

  // function to handle clear input form in case of add function
  // and cancel in case of update function
  const handleCancelClear = (e) => {
    e.preventDefault();
    if(formData){
      // If formdata is present them set it to null
      dispatch(contactAction.setFormData(null))
    }else{
      // If no form data present then clear all the inputs fiedls
      clearInputFields()
    }
    // Show toast message
    toast.info('fields cleared')
  }

  // function to handle add or update action depending on user requirement
  const handleAddUpdate = (e) => {
    e.preventDefault();
    if(formData){
      // If user wants to update a contact then it dispatches the
      // action to update the contact
      dispatch(updateContactThunk({...userData, address}));
      // Show toast message
      toast.success('Data updated successfully')
    }else{
      // If user wants to add a new contact then it
      // dispatches the add contact action
      dispatch(addContactThunk({id:contacts.length+1,...userData, address}))
      // Show toast message
      toast.success('contact added successfully')
    }
  }

  // Return JSX for form component
  return (
    <div className='p-3 text-bg-secondary contact-form'>
      <h2>Contact Form</h2>
      <hr />
      <form>
        <div className="mb-1">
          {/* Name field */}
          <label for="exampleInputEmail1" className="form-label">Enter Name</label>
          <input type="text" className="form-control"  required onChange={(e) => {setUserData({...userData, name: e.target.value})}} value={userData.name}/>
        </div>
        <div className="mb-1">
          {/* Phone number field */}
          <label for="exampleInputEmail1" className="form-label">Enter Number</label>
          <input type="text" className="form-control" required onChange={(e) => {setUserData({...userData, phone: e.target.value})}} value={userData.phone}/>
        </div>
        <div className="mb-1">
          {/* Email address field */}
          <label for="exampleInputEmail1" className="form-label">Enter Email</label>
          <input type="email" className="form-control" required onChange={(e) => setUserData({...userData, email: e.target.value})} value={userData.email}/>
        </div>
        {/* Address fields */}
        <h3 className='mt-2'>Address</h3>
        <hr />
        <div className="mb-1">
          {/* Street */}
          <label for="exampleInputEmail1" className="form-label">Enter Street</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, street: e.target.value})} value={address.street}/>
        </div>
        <div className="mb-1">
          {/* Suite */}
          <label for="exampleInputEmail1" className="form-label">Enter Suite</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, suite: e.target.value})} value={address.suite}/>
        </div>
        <div className="mb-1">
          {/* City */}
          <label for="exampleInputEmail1" className="form-label">Enter City</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, city: e.target.value})} value={address.city}/>
        </div>
        <div className="mb-1">
          {/* Zip code */}
          <label for="exampleInputEmail1" className="form-label">Enter Zipcode</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, zipcode: e.target.value})} value={address.zipcode}/>
        </div>
        {/* Add/Update button */}
        <button type="submit" className="btn btn-primary m-3" onClick={(e) => handleAddUpdate(e)}>
          {
            formData?'Update':'Add'
          }
        </button>
        {/* Cancel/Clear button */}
        <button className='btn btn-dark m-3' onClick={(e) => {handleCancelClear(e)}}>
          {
            formData?'Cancel':'Clear'
          }
        </button>
      </form>
    </div>
  )
}

export default ContactForm