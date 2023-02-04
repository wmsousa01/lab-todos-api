import express from 'express'
import cors from 'cors'
import connectDB from './config/db.connection.js'
import Todo from './models/Todo.model.js'

//Define a porta na qual a API/Server escutará
const PORT = 3001

//Conecta-se ao banco de dados
connectDB()

//Cria a instância do express
const app = express()

//Habilita o middleware que nos permite trabalhar com requests JSON
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to the Task API!')
})

//Cria uma nova task
app.post('/todo', async (req, res) => {
    const payload = req.body
    try {
        const newTask = await Task.create(req.payload)
        return res.status(201).json(newTask)
    } catch (error) {
        console.log('Erro ao criar tarefa ', error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Lista todos os toys
app.get('/todo', async (req, res) => {
    try {
        const task = await Task.find({})
        return res.status(200).json(task)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Obtém detalhes de um toy pelo id
app.get('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        const task = await Todo.findById(id)

        if(!task) {
            return res.status(404).json({message: 'Task not found'})
        }

        return res.status(200).json(task)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Atualiza um toy
app.put('/todo/:id', async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params

        const updatedTask = await Todo.findOneAndUpdate({_id: id}, payload, { new: true })
        return res.status(200).json(updatedTask)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Deleta um toy
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findOneAndDelete({_id: id})
        res.status(204).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

//Inicializa o meu servidor/api
app.listen(PORT, () => console.log('Server listening on port ', PORT))