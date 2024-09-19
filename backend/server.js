import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { pool } from './util/db.js'

dotenv.config()

const app = express()
//middleware
app.use(cors())
app.use(express.json())

// ROUTES //

// create a todo

app.post('/todos', async (req, res) => {
    const { description } = req.body
    try {
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.status(200).json(newTodo.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all todos

app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query(
            "SELECT * FROM todo"
        )
        res.status(200).json(todos.rows)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get a todo

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todos = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        res.status(200).json(todos.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a todo

app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    try {
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        )
        res.status(200).json('Todo Updated Successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a todo

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        )
        res.status(200).json('Todo Deleted Successfully')
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log('Server connected successfully on port=>', process.env.PORT)
})