import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = 'https://jsonplaceholder.typicode.com/users'
const initialState = {
    contacts: [],
    formData: null,
}


export const getContactsThunk = createAsyncThunk('contacts/getContacts', async(args, thunkAPI) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
});

export const addContactThunk = createAsyncThunk('contacts/addContact', async (args, thunkAPI) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    const data = await response.json();
    return data;
});

export const updateContactThunk = createAsyncThunk('contacts/updateContact', async (args, thunkAPI) => {
    console.log(args)
    const response = await fetch(`${url}/${args.id}`, {
        method: 'PUT',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const data = await response.json();
    console.log(data)
    return args;
});

export const deleteContactThunk = createAsyncThunk('contacts/deleteContact', async (args, thunkAPI) => {
    const response = await fetch(`${url}/${args.id}`, {
        method: 'DELETE',
        body: JSON.stringify(args),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    const data = await response.json();
    console.log(data)
    return args;
})



const contactSlice = createSlice({
    name: 'ContactList',
    initialState: initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContactsThunk.fulfilled, (state, action) => {
            state.contacts = [...action.payload]
        })
        .addCase(addContactThunk.fulfilled, (state, action) => {
            state.contacts.push(action.payload);
        })
        .addCase(updateContactThunk.fulfilled, (state, action) => {
            const data = action.payload;

            const list = state.contacts.filter((contact) => contact.id !== data.id);
            list.push(data);

            state.contacts = list;
        })
        .addCase(deleteContactThunk.fulfilled, (state, action) => {
            const data = action.payload;

            const list = state.contacts.filter((contact) => contact.id !== data.id);
            state.contacts = list;
        })
    }
});

export const contactReducer = contactSlice.reducer;
export const contactAction = contactSlice.actions;

export const contactSelector = (state) => state.contactReducer;