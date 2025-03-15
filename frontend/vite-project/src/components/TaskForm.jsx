import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Box } from '@mui/material'

const TaskForm = ({ authToken, setTasks, updateTaskInState, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
    } else {
      setTitle('')
    }
  }, [editingTask])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (editingTask) {
      try {
        const res = await axios.put(`http://localhost:5001/api/tasks/${editingTask._id}`, { title }, {
          headers: { 'x-auth-token': authToken }
        })
        updateTaskInState(res.data)
        setEditingTask(null)
      } catch (err) {
        console.error('Failed to update task:', err)
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5001/api/tasks', { title }, {
          headers: { 'x-auth-token': authToken }
        })
        setTasks(prev => [...prev, res.data])
      } catch (err) {
        console.error('Failed to add task:', err)
      }
    }
    setTitle('')
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        {editingTask ? 'Update Task' : 'Add Task'}
      </Button>
    </Box>
  )
}

export default TaskForm
