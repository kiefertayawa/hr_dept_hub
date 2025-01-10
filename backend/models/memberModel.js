import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        required: true
    },
    name: String,
    collegeBatch: String,
    ysesBatch: String,
}, {timestamps: true})

export default mongoose.model('Member', MemberSchema)