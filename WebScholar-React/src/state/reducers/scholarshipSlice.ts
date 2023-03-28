import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { dummyData } from '../../data/scholarshipData';

export type Level = 'Associate' | 'Bachelor' | 'Graduate' | 'Professional' | 'None';
export type AwardType = 'Scholarship' | 'Fellowship' | 'Grant' | 'Loan' | 'Prize';

export interface Scholarship{
  id: number,
  title: string,
  organization: string,
  description: string,
  amount: number,
  deadline: string,
  requirements: string[],
  levels: Level[], 
  type: AwardType[], 
}

interface scholarshipState {
  status: 'empty' | 'loading' | 'ready',
  list: Scholarship[],
}

// because we already have dummy data defined we assign it here in the initial state,
// eventually, this will need to be fetched from the API
const initialState: scholarshipState = {
  status: 'ready', // 'empty'
  list: dummyData, // []
}

export const scholarshipSlice = createSlice({
  name: 'scholarships',
  initialState,
  reducers:{
    setDefaultScholarships: state => {
      state.status = 'empty',
      state.list = []
    },
    setScholarshipsState: (state, action: PayloadAction<scholarshipState>) => {
      const {status, list} = action.payload; 
      Object.assign(state, {status, list})
    },
    setScholarshipsList: (state, action: PayloadAction<Scholarship[]>) => {
      state.list = action.payload;
    },
    setScholarshipsStatus: (state, action: PayloadAction<'empty' | 'loading' | 'ready'>) => {
      state.status = action.payload;
    }
  }
});


export const { setScholarshipsList, setScholarshipsState, setDefaultScholarships, setScholarshipsStatus } = scholarshipSlice.actions;
export const scholarshipList = (state: RootState) => state.scholarships.list;
export const scholarshipStatus = (state: RootState) => state.scholarships.status;
export default scholarshipSlice.reducer;