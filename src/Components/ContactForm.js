import React, { useEffect, useState } from 'react';
import '../Styles/ContactForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk, contactAction, contactSelector, updateContactThunk } from '../Redux/Reducers/contact.Reducer';

function ContactForm() {
  const dispatch = useDispatch();
  const { contacts, formData } = useSelector(contactSelector);

  const [userData, setUserData] = useState({})
  const [address, setAddress] = useState({})


  useEffect(() => {
    if(formData){
      setUserData({
        id: formData.id,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      })
      setAddress(formData.address)
    }else{
      clearInputFields()
    }
    // console.log('useEffect called')
  }, [formData]);

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

  const handleCancelClear = (e) => {
    e.preventDefault();
    if(formData){
      dispatch(contactAction.setFormData(null))
    }else{
      clearInputFields()
    }
  }

  const handleAddUpdate = (e) => {
    e.preventDefault();
    if(formData){
      dispatch(updateContactThunk({...userData, address}))
    }else{
      dispatch(addContactThunk({id:contacts.length+1,...userData, address}))
    }
  }

  return (
    <div className='p-3 text-bg-secondary contact-form'>
      <h2>Contact Form</h2>
      <hr />
      <form>
      <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Name</label>
          <input type="text" className="form-control"  required onChange={(e) => {setUserData({...userData, name: e.target.value})}} value={userData.name}/>
        </div>
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Number</label>
          <input type="text" className="form-control" required onChange={(e) => {setUserData({...userData, phone: e.target.value})}} value={userData.phone}/>
        </div>
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Email</label>
          <input type="email" className="form-control" required onChange={(e) => setUserData({...userData, email: e.target.value})} value={userData.email}/>
        </div>
        <h3>Address</h3>
        <hr />
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Street</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, street: e.target.value})} value={address.street}/>
        </div>
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Suite</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, suite: e.target.value})} value={address.suite}/>
        </div>
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter City</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, city: e.target.value})} value={address.city}/>
        </div>
        <div className="mb-1">
          <label for="exampleInputEmail1" className="form-label">Enter Zipcode</label>
          <input type="text" className="form-control" onChange={(e) => setAddress({...address, zipcode: e.target.value})} value={address.zipcode}/>
        </div>
        <button type="submit" className="btn btn-primary m-3" onClick={(e) => handleAddUpdate(e)}>
          {
            formData?'Update':'Add'
          }
        </button>
        
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