const mongoose = require('mongoose')

const fuelSchema = new mongoose.Schema({
    gallons: {
        type: String,
        require: true,
        validate: function () {
            return this.gallons !== "" && this.gallons !== " "
        }
    },
    date: {
        type: String,
        require: true,
        validate: function () {
            return this.date !== "" && this.date !== " "
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
})

const fuelModel = new mongoose.model('fuelModel', fuelSchema)
module.exports = fuelModel;