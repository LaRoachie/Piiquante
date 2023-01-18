import jwt from 'jsonwebtoken'

export default function auth(req, res, next){
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const data = jwt.verify(token, process.env.PRIVATE_KEY)
        req.auth = data
        next()
    }
    catch(err) {
        console.error(err)
        return res.sendStatus(401)
    }
}