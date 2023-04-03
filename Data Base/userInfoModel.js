const mongoose = require('mongoose')

const userInforSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        validate: function () {
            return this.fullname !== "" && this.fullname !== " "
        }
    },
    address1: {
        type: String,
        require: true,
        validate: function () {
            return this.address1 !== "" && this.address1 !== " "
        }
    },
    address2: {
        type: String,
        require: true,
        validate: function () {
            return this.address2 !== "" && this.address2 !== " "
        }
    },
    zip_code: {
        type: String,
        require: true,
        validate: function () {
            return this.zip_code !== "" && this.zip_code !== " "
        }
    },
    state: {
        type: String,
        require: true,
        validate: function () {
            return this.state !== "" && this.state !== " "
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
})

const userInfoModel = new mongoose.model('userInfoModel', userInforSchema)
module.exports = userInfoModel;