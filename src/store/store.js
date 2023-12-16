import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterSlice';
import todosReducer from '../reducer/todoSlice';
import todosByIdReducer from '../reducer/todoDynamicSlice';
import registerReducer from '../reducer/registerSlice';

// Custom middleware to save the token
const saveTokenMiddleware = () => (next) => (action) => {
  // check mana action type yang mau
  if (action.type == 'register/registerUser/fulfilled') {
    const response = action.payload;
    const token = response?.token;
    //save to token
    console.log('Middleware Response', response);
    console.log('Middleware token', token);
    // save token to licalStorage
    localStorage.setItem('token', token);
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    todosById: todosByIdReducer,
    register: registerReducer,
  },
  //middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializable for func
      serializableCheck: false,
    }).concat(saveTokenMiddleware),
});
