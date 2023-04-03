const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        validate: function () {
            return this.username !== "" && this.username !== " "
        }
    },
    password: {
        type: String,
        require: true,
        validate: function () {
            return this.password.length > 5
        }
    }
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
})

const userModel = new mongoose.model('userModel', userSchema);
module.exports = userModel
