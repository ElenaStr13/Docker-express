const {Schema, model} = require("mongoose")

const userSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
})

module.exports = model('user', userSchema)