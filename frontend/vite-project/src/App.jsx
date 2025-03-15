import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import TodoList from './components/TodoList'
import { AuthProvider } from './context/AuthContext'
import { Box, Paper, Container } from '@mui/material'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'background.default',
            padding: 2
          }}
        >
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/todos" element={<TodoList />} />
              </Routes>
            </Paper>
          </Container>
        </Box>
      </Router>
    </AuthProvider>
  )
}

export default App
