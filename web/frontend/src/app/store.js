import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../services/ui/uiSlice'
import authReducer from '../services/auth/authSlice'



export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    
    
    
  },
})
