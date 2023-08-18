import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RatingSchema } from '../types/RatingSchema';
const initialState: RatingSchema = {
  text: ''
};
const rating = createSlice({
  name: 'rating',
  initialState,
  reducers: {}
  //extraReducers: (builder) => {
  //builder
  //.addCase(.pending, (state) => {
  //})
  //.addCase(.fulfilled, (state, action) => {
  //})
  //.addCase(.rejected, (state, action) => {
  //});
  //}
});
export const { actions: ratingActions } = rating;
export const { reducer: ratingReducer } = rating;
