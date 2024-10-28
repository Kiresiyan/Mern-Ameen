import express from 'express'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../Controllers/todoController.js'

const router = express.Router()

router.get('/',getTodos )

router.post('/new', createTodo )

router.patch('/:id', updateTodo  );

router.delete('/:id', deleteTodo );

export default router

