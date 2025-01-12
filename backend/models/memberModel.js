import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    parentId: String,
    bloodline: String,
    name: String,
    collegeBatch: String,
    ysesBatch: String,
}, {timestamps: true})

export default mongoose.model('Member', MemberSchema)