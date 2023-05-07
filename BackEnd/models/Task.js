import { mongoose } from 'mongoose'
const { model, Schema } = mongoose

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  complete: { type: Boolean, default: false }
}, { timestamps: true })

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Task = model('Task', taskSchema)

export default Task
