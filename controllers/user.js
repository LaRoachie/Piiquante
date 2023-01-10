import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { User } from "../models/user.js";


export async function signUp(req, res) {
    try {
        const user = new User({
            email: req.body.email,
            // hasher le MDP
            password: await bcrypt.hash(req.body.password, 10),
        })
        await user.save()
        res.status(201).json({
            message: 'Votre compte est créé'
        })
    }
    catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

// LOGIN
export async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!user) {
            // Erreur 401 et non 404 pour brouiller les pistes
            return res.sendStatus(401)
        }
        // Pour vérifier si un mot de passe est correct
        const passwordValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValid) {
            return res.sendStatus(401)
        }
        res.json({
            userId: user._id,
            token: jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, { expiresIn:"12h" })
        })
    }
    catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

