import Router from 'express'
import { getAllTasks, findTaskById, CreateNewTask, deleteTaskById, updateTaskById, getTaskFilter } from '../controllers/Task.js'
// Schemas
const taskRouter = Router()

taskRouter.get('/', getAllTasks)
taskRouter.get('/:id', findTaskById)

taskRouter.post('/', CreateNewTask)
taskRouter.post('/filter', getTaskFilter)

taskRouter.delete('/:id', deleteTaskById)

taskRouter.patch('/:id', updateTaskById)

export default taskRouter
