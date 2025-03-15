import React, { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: null,
    user: null
  })

  const api = axios.create({
    baseURL: 'http://localhost:5001/api'
  })

  const register = async (username, email, password) => {
    const res = await api.post('/register', { username, email, password })
    setAuthData({
      token: res.data.token,
      user: { username, email }
    })
  }

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password })
    setAuthData({
      token: res.data.token,
      user: { email }
    })
  }

  const logout = () => {
    setAuthData({
      token: null,
      user: null
    })
  }

  return (
    <AuthContext.Provider value={{ authData, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
