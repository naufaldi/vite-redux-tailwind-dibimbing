import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// representasi ini buat apa?
export const fetchRegisterUser = createAsyncThunk(
  'register/registerUser',
  async (userData) => {
    //try catch utk check func bner / salah
    try {
      const response = await fetch('https://reqres.in/api/register', {
        //method base on API => DELETE, PUT, PATCH, POST
        method: 'POST',
        //headers => content apa? application/json
        headers: {
          'Content-Type': 'application/json',
        },
        //isi body, sesuai API. biasanya JSON String
        body: JSON.stringify(userData),
      });
      //check response
      if (!response.ok) {
        // mau ngapain?
        throw new Error('login fail');
      }
      //respon sukses?
      console.log('response oke / berhasil');
      const data = await response.json();
      return data;
    } catch (error) {
      //error handle
      console.log('error di try catch', error);
      throw error;
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    response: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        (state.status = 'succeeded'), (state.response = action.payload);
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
