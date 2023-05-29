import {combineReducers,configureStore} from '@reduxjs/toolkit'

import books from './slices/books';

const reducer = combineReducers({
    books,
})

export default configureStore({
    reducer
});

