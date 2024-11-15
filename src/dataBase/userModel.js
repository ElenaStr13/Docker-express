const {Schema, model} = require("mongoose")

const userShema = new Schema ({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
})

module.exports = model('user', userShema)