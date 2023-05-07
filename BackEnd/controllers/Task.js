import Task from '../models/Task.js'

export const getAllTasks = async (request, response) => {
  const task = await Task.find({})
  response.status(200).json(task)
}

export const findTaskById = async (request, response) => {
  try {
    const { id } = request.params
    const task = await Task.findById({ _id: id })
    if (!task) return response.status(404).json({ error: 'Document not found.' })
    response.status(200).json(task)
  } catch (error) {
    response.status(400).json(error)
  }
}

export const CreateNewTask = async (request, response) => {
  try {
    const task = new Task(request.body)
    const savedTask = await task.save()
    response.status(201).json(savedTask)
  } catch (error) {
    return response.status(500).json({ error: 'Something went wrong.' })
  }
}

export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedDoc = await Task.findByIdAndRemove({ _id: id })
    if (!deletedDoc) return res.status(404).json({ error: 'Document not found.' })
    res.status(200).json(deletedDoc)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateTaskById = async (request, response) => {
  try {
    const { id } = request.params
    const updatedDoc = await Task.findByIdAndUpdate({ _id: id }, request.body, { new: true })
    if (!updatedDoc) return response.status(404).json({ error: 'Document not found.' })
    response.status(200).json(updatedDoc)
  } catch (error) {
    response.status(400).json(error)
  }
}

export const getTaskFilter = async (request, response) => {
  try {
    const { complete } = request.body
    if (complete !== undefined) {
      const docs = await Task.find({ complete })
      response.status(200).json(docs)
    } else {
      const docs = await Task.find({})
      response.status(200).json(docs)
    }
  } catch (error) {
    response.status(400).json(error)
  }
}

export default {
  getAllTasks,
  getTaskFilter,
  findTaskById,
  CreateNewTask,
  deleteTaskById,
  updateTaskById
}
