import mongoose from 'mongoose';

const sauceShema = new mongoose.Schema({
    userId:{type: String, required: true},
    name:{type: String, required: true},
    manufacturer:{type: String, required: true},
    description:{type: String, required: true},
    mainPepper:{type: String, required: true},
    imageName:{type: String, required: true},
    heat:{type: Number, required: true},
    usersLiked:{type: [String], required: true},
    usersDisliked:{type: [String], required: true},
})

export const Sauce = mongoose.model('Sauce', sauceShema)