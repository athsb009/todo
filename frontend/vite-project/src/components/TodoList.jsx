import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import TaskForm from './TaskForm'
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const TodoList = () => {
  const { authData, logout } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/tasks', {
          headers: { 'x-auth-token': authData.token }
        })
        setTasks(res.data)
      } catch (err) {
        console.error('Failed to fetch tasks:', err)
      }
    }
    fetchTasks()
  }, [authData.token])

  const toggleTaskCompletion = async (task) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/tasks/${task._id}`, { 
        title: task.title, 
        completed: !task.completed 
      }, {
        headers: { 'x-auth-token': authData.token }
      })
      updateTaskInState(res.data)
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`, {
        headers: { 'x-auth-token': authData.token }
      })
      setTasks(tasks.filter(task => task._id !== id))
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const updateTaskInState = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)))
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Your To-Do List
        </Typography>
        <TaskForm
          authToken={authData.token}
          setTasks={setTasks}
          updateTaskInState={updateTaskInState}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
        <List>
          {tasks.map(task => (
            <ListItem key={task._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Checkbox 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task)}
              />
              <ListItemText
                primary={task.title}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  flex: 1,
                  ml: 1
                }}
              />
              <Button variant="outlined" onClick={() => setEditingTask(task)} sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => deleteTask(task._id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default TodoList
