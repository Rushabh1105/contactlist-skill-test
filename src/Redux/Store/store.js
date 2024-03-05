
import { configureStore } from '@reduxjs/toolkit'
import { contactReducer  } from '../Reducers/contact.Reducer'

export const store = configureStore({
    reducer: {
        contactReducer,
    }
})