import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { FormData } from '@/types/form';

interface FormState {
  newSubmissionId: null | string;
  submissions: FormData[];
}

const initialState: FormState = {
  newSubmissionId: null,
  submissions: [],
};

export const formSlice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    addSubmission: (state, action: PayloadAction<FormData>) => {
      state.submissions.push(action.payload);
      state.newSubmissionId = action.payload.id;
    },
    clearNewSubmission: (state) => {
      state.newSubmissionId = null;
    },
    clearSubmissions: (state) => {
      state.submissions = [];
    },
  },
});

export const { addSubmission, clearNewSubmission, clearSubmissions } = formSlice.actions;
export default formSlice.reducer;
