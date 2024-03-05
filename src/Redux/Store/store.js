// import redux/toolkit functions
import { configureStore } from '@reduxjs/toolkit';
// Import the reducer
import { contactReducer  } from '../Reducers/contact.Reducer';

// Export the store
export const store = configureStore({
    reducer: {
        contactReducer,
    }
})