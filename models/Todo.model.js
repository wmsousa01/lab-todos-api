import mongoose from "mongoose";

/**
 * name: String, obrigatório
 * collectedDate: Date, obrigatorio
 * manufacturingDate: Date,
 * value: Number, default: 0 
 */

const { Schema, model } = mongoose

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
            type: Schema.Types.ObjectId,
            ref: "User"
    }

}, { timestamps: true })

export default model('Todo', taskSchema)