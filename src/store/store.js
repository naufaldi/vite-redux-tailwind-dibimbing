import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterSlice';
import todosReducer from '../reducer/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});
