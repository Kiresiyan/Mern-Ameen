import { Todo } from '../models/Todo.js'

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createTodo = async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
    })
    try {
        const response = await newTodo.save()
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateTodo = async (req, res) => {
    const {body,params:{id} } = req;
    try {
            const updatedItem = await Todo.findOneAndUpdate({id}, body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    try {
        await Todo.findOneAndDelete({id})
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}