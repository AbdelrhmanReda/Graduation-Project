import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../services/ui/uiSlice'
import authReducer from '../services/auth/authSlice'
import companyReducer from '../services/company/companySlice'
import jobReducer from '../services/job/jobSlice'
import applicantReducer from '../services/applicant/applicantSlice'



export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    company: companyReducer,
    job: jobReducer,
    applicant: applicantReducer,
    
    
  },
})
