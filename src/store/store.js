import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducer/counterSlice';
import todosReducer from '../reducer/todoSlice';
import todosByIdReducer from '../reducer/todoDynamicSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    todosById: todosByIdReducer,
  },
});
