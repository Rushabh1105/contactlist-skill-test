// Importing redux toolkit functions
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// backend URL
const url = 'https://jsonplaceholder.typicode.com/users'
// Initial state of app
const initialState = {
    contacts: [],
    formData: null,
}

// Fetch data from url
export const getContactsThunk = createAsyncThunk('contacts/getContacts', async(args, thunkAPI) => {
    // Fetch data
    const response = await fetch(url);
    // Convert it to json
    const data = await response.json();
    // return the dat
    return data;
});

// Add new contact to backend API
export const addContactThunk = createAsyncThunk('contacts/addContact', async (args, thunkAPI) => {
    // Make POST request to add new contact to backend
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    // conert data to json
    const data = await response.json();
    // return data
    return data;
});

// Update a contact to backend API
export const updateContactThunk = createAsyncThunk('contacts/updateContact', async (args, thunkAPI) => {
    // console.log(args)
    // Make PUT request to url using id 
    const response = await fetch(`${url}/${args.id}`, {
        method: 'PUT',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const data = await response.json();
    console.log(data)
    // return data 
    return args;
});

// Delete a contact from backend API
export const deleteContactThunk = createAsyncThunk('contacts/deleteContact', async (args, thunkAPI) => {
    // Make DELETE request to backend API
    const response = await fetch(`${url}/${args.id}`, {
        method: 'DELETE',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    // Convet response to json
    const data = await response.json();
    console.log(data)
    // Return the JSON data
    return args;
})


// Reducer slice for contacts
const contactSlice = createSlice({
    name: 'ContactList',
    initialState: initialState,
    // reducers
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        }
    },
    // extra reducers
    extraReducers: (builder) => {
        // add data to contacts list in list
        builder.addCase(getContactsThunk.fulfilled, (state, action) => {
            state.contacts = [...action.payload]
        })
        // add new contacts to contact list
        .addCase(addContactThunk.fulfilled, (state, action) => {
            const id = state.contacts.length+1;
            action.payload.id = id;
            state.contacts = [...state.contacts, action.payload];
        })
        // Update the contact list
        .addCase(updateContactThunk.fulfilled, (state, action) => {
            const data = action.payload;

            const list = state.contacts.filter((contact) => contact.id !== data.id);
            list.push(data);

            state.contacts = list;
        })
        // Delete contact list
        .addCase(deleteContactThunk.fulfilled, (state, action) => {
            const data = action.payload;
            const list = state.contacts.filter((contact) => contact.id !== data.id);
            state.contacts = list;
        })
    }
});

// Export the reducer
export const contactReducer = contactSlice.reducer;
// Export the actions
export const contactAction = contactSlice.actions;
// Export selector
export const contactSelector = (state) => state.contactReducer;