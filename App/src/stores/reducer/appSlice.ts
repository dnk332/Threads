import {createSlice} from '@reduxjs/toolkit';

interface AppDataState {
  openModal: boolean;
}

const initialState: AppDataState = {
  openModal: false,
};

export const commonSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openModal: state => {
      state.openModal = true;
    },
    closeModal: state => {
      state.openModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {openModal, closeModal} = commonSlice.actions;

export const reducer = commonSlice.reducer;
