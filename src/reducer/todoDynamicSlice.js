import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//fetching data todo
export const fetchToDoById = createAsyncThunk(
  'todos/fetchTodoById',
  async (todoId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    const data = await response.json();
    return data;
  }
);

//slice / reducers
const todosByIdSlice = createSlice({
  //nama state
  name: 'todosById',
  initialState: {
    //state data todos
    todo: {},
    status: 'idle',
    error: null,
  },
  //reducer sync
  reducers: {},
  //reducer async
  extraReducers: (builder) => {
    builder
      //ini untuk loading, simpan ke state 'status'
      .addCase(fetchToDoById.pending, (state) => {
        state.status = 'loading';
      })
      //ini untuk success, simpan ke state 'status'
      //ini untuk data, simpan ke state 'todo'
      .addCase(fetchToDoById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todo = action.payload;
      })
      //ini untuk fail, simpan ke state 'status'
      //ini untuk error, simpan ke state 'error'
      .addCase(fetchToDoById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default todosByIdSlice.reducer;
