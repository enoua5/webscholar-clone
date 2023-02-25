import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';
import { RootState } from '../store';

interface personalInfo {
  firstName: string,
  lastName: string,
  middle?: string | undefined,
  birth: Dayjs,
  gender: string,
  ethnicity: string,
  citizen: boolean,
  visaStatus?: boolean,
  visa?: any | undefined,
  email: string,
  phone?: string,
  streetAddress: string,
  streetAddress2?: string | undefined,
  city: string,
  state: string,
  zip: string,
  financialAid: boolean,
  noFinancialAidReason?: string | undefined,
  additionalAid: boolean | string,
  taxStatus: string,
  dependentsClaimed: number,
  employmentStatus: string,
  employmentAmount: string
};

interface academicInfo {
  highSchool: string,
  highSchoolState: string,
  highSchoolGraduationDate: Dayjs,
  highSchoolGPA: number,
  highSchoolTranscript: any,
  college: string,
  major: string,
  collegeState: string,
  gradeLevel: string,
  freshmanFirstSemester?: string,
  collegeGPA: number,
  collegeTranscript: any,
  collegeGraduationDate: Dayjs
};

interface extracurricular{
  activities: {name: string, description: string}[]
};

interface awards{
  awards: {name: string, description: string}[]
}

interface UserState {
  firstName: string,
  lastName: string,
  email: string,
  role: "student" | "administrator" | "committee" | "",
  active: boolean,
  forms: {
    [key: string]: personalInfo | academicInfo | extracurricular | awards | {text: string} | undefined
    personalInfo?: personalInfo,
    academicInfo?: academicInfo,
    extracurricular?: extracurricular,
    awards?: awards,
    about?: { text: string }
  }
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  active: false,
  forms: {}
}

const setDefaultUserReducer: CaseReducer<UserState> = (state) => {
  state = initialState
}

const setUserStateReducer: CaseReducer<UserState, PayloadAction<UserState>> = (state, action)=> {
  const {firstName, lastName, email, role, active} = action.payload;
  Object.assign(state, {firstName, lastName, email, role, active})
}

const setUserFormReducer: CaseReducer<UserState, PayloadAction<{name: string, form: personalInfo | academicInfo | extracurricular | awards | {text: string}}>> = (state, action) => {
  const {name, form} = action.payload;
  state.forms[name] = form;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setDefaultUser: setDefaultUserReducer,
    setUserState: setUserStateReducer,
    setUserForm: setUserFormReducer,
  }
});


export const { setDefaultUser, setUserState, setUserForm } = userSlice.actions;
export const userState = (state: RootState) => state.user;
export const userPersonalInfo = (state: RootState) => state.user.forms.personalInfo;
export const userAcademicInfo = (state: RootState) => state.user.forms.academicInfo;
export const userExtracurricularInfo = (state: RootState) => state.user.forms.extracurricular;
export const userAwardsInfo = (state: RootState) => state.user.forms.awards;
export const userAboutInfo = (state: RootState) => state.user.forms.about;
export default userSlice.reducer;