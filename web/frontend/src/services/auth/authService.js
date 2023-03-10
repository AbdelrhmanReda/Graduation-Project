import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/auth`

// Register user
const register = async (userData) => {
const response = await axios.post('http://localhost:8000/api/auth/candidate/register', userData)
  

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
 
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post('http://localhost:8000/api/auth/candidate/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
