import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    status: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

// Pre-save hook to auto-increment the id
TodoSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastTodo = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        this.id = lastTodo?.id ? lastTodo.id + 1 : 1;
    }
    next();
});

export const Todo = mongoose.model('Todo', TodoSchema)
