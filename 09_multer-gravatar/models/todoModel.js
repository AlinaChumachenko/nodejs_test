import { model, Schema, Types } from 'mongoose';
// в подальшому треба завести миделварки з валідацією
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 300,
    },
    due: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Todo = model('Todo', todoSchema);

export { Todo };
