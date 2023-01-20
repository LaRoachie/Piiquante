import { Sauce } from "../models/sauce.js";

// Recupération de la liste des sauces
export async function sauceList(req, res, next){
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces)
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}
// Recupération d'une sauce via l'ID
export async function sauce(req, res, next){
    Sauce.findOne({
        _id: req.params.id,
    })
        .then((sauce) => {
            res.status(200).json(sauce)
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}

// Création d'une sauce
export async function createSauce(req, res) {
    const sauceObjet = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObjet,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
sauce
    .save()
    .then((sauce) => {
        res.status(201).json({ sauce})
    })
    .catch((error) => {
        res.status(400).json({
            error: error, 
        })
    })
}
export async function postSauceLiked(req, res){
    res.json([])
}

// Modification d'une sauce
export async function updateSauce(req, res){
    
}

// Suppression d'une sauce
export async function deleteSauce(req, res){

}