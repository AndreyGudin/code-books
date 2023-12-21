import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ArticleFormSchema } from '../types/ArticleFormSchema';
const initialState: ArticleFormSchema = {
  text: ''
};
const articleForm = createSlice({
  name: 'articleForm',
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
export const { actions: articleFormActions } = articleForm;
export const { reducer: articleFormReducer } = articleForm;
