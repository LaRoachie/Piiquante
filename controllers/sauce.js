import { Sauce } from "../models/sauce.js";
import fs from "fs";

// Recupération de la liste des sauces
export async function sauceList(req, res) {
    try {
        const sauces = await Sauce.find()
        res.status(200).json(sauces.map(sauce => normalizer(sauce, req)))
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


// Recupération d'une sauce via l'ID
export async function sauce(req, res) {
    try {
        const sauce = await Sauce.findOne({
            _id: req.params.id,
        })
        res.status(200).json(normalizer(sauce, req))
    }
    catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


// Création d'une sauce
export async function createSauce(req, res) {
    try {
        const sauceObjet = JSON.parse(req.body.sauce)
        const sauce = new Sauce({
            ...sauceObjet,
            userId: req.auth.id,
            imageName: req.file.filename
        })
        sauce
            .save()
        res.status(201).json({ sauce })
    }
    catch (error) {
            res.status(400).json({
                error: error
            })
        }
    }


// Modification d'une sauce
export async function updateSauce(req, res) {
    try {
        const sauce = await Sauce.findOne({
            _id: req.params.id,
        })
        if (sauce.userId !== req.auth.id) {
            return res.sendStatus(401)
        }
        let newSauce = null
        if (req.file) {
            const sauceObjet = JSON.parse(req.body.sauce)
            newSauce = { 
                ...sauceObjet,
                userId: req.auth.id,
                imageName: req.file.filename
            }
            fs.unlinkSync('images/' + sauce.imageName)
        }
        else {
            newSauce = { ...req.body }
        }
        await Sauce.updateOne({ _id: req.params.id }, { ...newSauce, _id: req.params.id })
        res.status(200).json({ message: 'Objet modifié !'})
    } 
    catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


// Suppression d'une sauce
export async function deleteSauce(req, res) {
    try {
        const sauce = await Sauce.findOne({
            _id: req.params.id,
        })
        if (sauce.userId !== req.auth.id) {
            return res.sendStatus(401)
        }
        await Sauce.deleteOne({ _id: req.params.id})
        fs.unlinkSync('images/' + sauce.imageName)
        res.status(200).json({ message: 'Objet supprimé !'})
    } 
    catch (error) {
        res.status(400).json({
            error: error
        })
    }
}


// Like/Dislike d'une sauce
export async function postSauceLiked(req, res) {
    const sauce = await Sauce.findOne({
        _id: req.params.id,
    })
    const userId = req.auth.id

    // Like remove
    sauce.usersLiked = sauce.usersLiked.filter(_userId => userId !== _userId)
    // DisLike remove
    sauce.usersDisliked = sauce.usersDisliked.filter(_userId => userId !== _userId)

    if (req.body.like === 1) {
        sauce.usersLiked.push(userId)
    }
    if (req.body.like === -1) {
        sauce.usersDisliked.push(userId)
    }
    await sauce.save()
}


function normalizer(sauce, req) {
    return {
        ...sauce.toObject(),
        imageUrl: req.protocol + '://' + req.get('host') + '/images/' + sauce.imageName,
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length
    }
}