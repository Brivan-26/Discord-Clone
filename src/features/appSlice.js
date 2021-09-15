import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelId:null,
    channelName:null,
  },
  reducers: {
    setchannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setchannelInfo} = appSlice.actions;

export const selectchannelId = (state) => state.app.channelId;
export const selectchannelName = (state) => state.app.channelName;


export default appSlice.reducer;
