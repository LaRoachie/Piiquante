import { Sauce } from "../models/sauce.js";

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
    catch {
        (error) => {
            res.status(400).json({
                error: error,
            })
        }

    }
}

// Like/Dislike d'une sauce
export async function postSauceLiked(req, res) {
    res.json([])
}

// Modification d'une sauce
export async function updateSauce(req, res) {

}

// Suppression d'une sauce
export async function deleteSauce(req, res) {

}

function normalizer(sauce, req) {
    return {
        ...sauce.toObject(),
        imageUrl: req.protocol + '://' + req.get('host') + '/images/' + sauce.imageName,
        likes: sauce.usersLiked.length,
        dislikes: sauce.usersDisliked.length
    }
}