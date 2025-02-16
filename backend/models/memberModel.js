import mongoose from 'mongoose'

const MemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    parentId: String,
    name: String,
    collegeBatch: String,
    ysesBatch: String,
    bloodline: String,
    mentor: String,
    imageUrl: String,           // Added image url attribute
}, {timestamps: true})

export default mongoose.model('Member', MemberSchema)